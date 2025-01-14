from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Note
from django.core.files.uploadedfile import SimpleUploadedFile

class RegisterViewTests(APITestCase):
    def test_register_user_success(self):
        url = reverse('register')
        data = {'username': 'testuser', 'password': 'testpass123', 'email': 'testuser@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_register_user_missing_username_or_password(self):
        url = reverse('register')
        data = {'username': '', 'password': 'testpass123', 'email': 'testuser@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        data = {'username': 'testuser', 'password': '', 'email': 'testuser@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_existing_username(self):
        User.objects.create_user(username='testuser', password='testpass123', email='testuser@example.com')
        url = reverse('register')
        data = {'username': 'testuser', 'password': 'testpass123', 'email': 'testuser2@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class NoteAudioUploadViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.note = Note.objects.create(title='Test Note', description='Test description', user=self.user)
        self.client.force_authenticate(user=self.user)

    def test_upload_audio_success(self):
        url = reverse('note-audio-upload', args=[self.note.id])
        audio_file = SimpleUploadedFile("file.mp3", b"file_description", content_type="audio/mpeg")
        data = {'audio': audio_file}
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.note.refresh_from_db()
        self.assertIsNotNone(self.note.audio)

    def test_upload_audio_no_file(self):
        url = reverse('note-audio-upload', args=[self.note.id])
        data = {}
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
class NoteViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_note_success(self):
        url = reverse('note-list')
        data = {'title': 'Test Note', 'description': 'Test description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(Note.objects.get().title, 'Test Note')
        self.assertEqual(Note.objects.get().user, self.user)

    def test_create_note_unauthenticated(self):
        self.client.logout()
        url = reverse('note-list')
        data = {'title': 'Test Note', 'description': 'Test description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)