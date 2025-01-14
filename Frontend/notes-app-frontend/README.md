# Notes App Frontend

This is the frontend application for the Notes App, built using React and React Router. The application allows users to authenticate, view notes, and create/edit notes.

## Assumptions

1. **Authentication**: The application assumes that a valid authentication token is stored in the local storage under the key `token`. This token is used to determine if a user is authenticated.
2. **Routing**: The application uses React Router for client-side routing. It assumes that the user will be redirected to the appropriate pages based on their authentication status.
3. **Context**: The application uses a `NavigationProvider` context to manage navigation-related state.

## Technical Design and Architecture

### Components

- **App**: The main component that sets up the router and routes.
- **AuthPage**: The component for the authentication page.
- **ViewNotesPage**: The component for viewing notes.
- **CreateEditNotePage**: The component for creating and editing notes.

### Routing

The application uses React Router for routing. The routes are defined as follows:

- `/`: Redirects to `/notes` if the user is authenticated, otherwise displays the `AuthPage`.
- `/notes`: Displays the `ViewNotesPage` if the user is authenticated, otherwise redirects to `/`.
- `/create`: Displays the `CreateEditNotePage` if the user is authenticated, otherwise redirects to `/`.
- `/edit/:noteId`: Displays the `CreateEditNotePage` if the user is authenticated, otherwise redirects to `/`.

### Context

The `NavigationProvider` context is used to manage navigation-related state. This context is wrapped around the `Routes` component in the `App` component.

## Running and Testing the Application

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sweetdream0530/DentalBe.git
   cd notes-app-frontend

2. Install the dependencies:
   ```bash
   npm install

3. Running the Application:
   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser.

4. Testing the Application:
   ```bash
   npm start
   ```
   This will run the test suite and display the results in the terminal.