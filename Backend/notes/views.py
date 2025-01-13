from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer

# User Registration
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
    
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class NoteAudioUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, noteId):
        note = get_object_or_404(Note, pk=noteId, user=request.user)
        audio_file = request.FILES.get('audio')

        if not audio_file:
            return Response({"error": "Audio file is required."}, status=status.HTTP_400_BAD_REQUEST)

        note.audio = audio_file
        note.save()

        return Response({"message": "Audio uploaded successfully."}, status=status.HTTP_200_OK)
    
class NoteViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.login(username='testuser', password='testpass123')

    def test_create_note_success(self):
        url = reverse('note-list')
        data = {'title': 'Test Note', 'content': 'Test Content'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(Note.objects.get().title, 'Test Note')
        self.assertEqual(Note.objects.get().user, self.user)

    def test_create_note_unauthenticated(self):
        self.client.logout()
        url = reverse('note-list')
        data = {'title': 'Test Note', 'content': 'Test Content'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)