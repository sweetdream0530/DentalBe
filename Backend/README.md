# DentalBee Backend

This is the backend application for the DentalBee project, built using Django and Django REST Framework. The application provides APIs for user registration, note management, and audio file uploads.

## Assumptions

1. **Authentication**: The application uses JWT (JSON Web Tokens) for authentication. It assumes that the frontend will handle the token management and include the token in the Authorization header for authenticated requests.
2. **User Model**: The application uses Django's built-in `User` model for user management.
3. **Note Model**: The application assumes that each note is associated with a user and can optionally have an audio file attached.

## Technical Design and Architecture

### Components

- **RegisterView**: An API view for user registration.
- **NoteViewSet**: A viewset for managing notes, including creating, retrieving, updating, and deleting notes.
- **NoteAudioUploadView**: An API view for uploading audio files to notes.

### Models

- **User**: The built-in Django user model.
- **Note**: A custom model representing a note, which includes fields for title, content, and an optional audio file.

### Serializers

- **NoteSerializer**: A serializer for the `Note` model.

### Permissions

- **IsAuthenticated**: A permission class that ensures the user is authenticated before accessing certain views.

## Running and Testing the Application

### Prerequisites

- Python (v3.8 or higher)
- Django (v3.2 or higher)
- Django REST Framework (v3.12 or higher)
- Django REST Framework SimpleJWT (v4.7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sweetdream0530/DentalBe
   cd DentalBe
   cd Backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply the migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
   
## Running the Application
   ```bash
   python manage.py runserver
   ```
   This will start the development server at http://127.0.0.1:8000/.

## Testing the Application
   ```bash
   python manage.py test
   ```
   This will run the test suite and display the results in the terminal.

## Testing Coverage

1. Install the coverage package:
   ```bash
   pip install coverage
   ```
2. Run your tests with coverage:
   ```bash
   coverage run --source='.' manage.py test
   ```
3. Generate the coverage report:
   ```bash
   coverage report
   ```

   This application Testing Coverage is 94%.

## API Endpoints
### User Registration
- **POST /register/**: Register a new user.
   - Request body: `{ "username": "user", "password": "pass", "email": "user@example.com" }`
   - Response: `{ "message": "User registered successfully." }`
### Notes
- **GET /notes/**: Retrieve a list of notes (authenticated).
- **POST /notes/**: Create a new note (authenticated).
   - Request body: `{ "title": "Note Title", "description": "Note description" }`
   - Response: `{ "id": 1, "title": "Note Title", "description": "Note description"}`
### Note Audio Upload
- **POST /notes/{noteId}/upload_audio/**: Upload an audio file to a note (authenticated).
   - Request body: `{ "audio": <file> }`
   - Response: `{ "message": "Audio uploaded successfully." }`