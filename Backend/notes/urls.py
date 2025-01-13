from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, NoteViewSet, NoteAudioUploadView

router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')


urlpatterns = [
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/<int:noteId>/audio/', NoteAudioUploadView.as_view(), name='note-audio-upload'),
] + router.urls