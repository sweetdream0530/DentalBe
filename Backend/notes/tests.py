from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Note
from io import BytesIO
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
        self.note = Note.objects.create(title='Test Note', content='Test Content', user=self.user)
        self.client.login(username='testuser', password='testpass123')

    def test_upload_audio_success(self):
        url = reverse('note-audio-upload', args=[self.note.id])
        audio_file = SimpleUploadedFile("file.mp3", b"file_content", content_type="audio/mpeg")
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