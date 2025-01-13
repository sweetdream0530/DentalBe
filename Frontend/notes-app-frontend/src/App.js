import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavigationProvider } from "./NavigationContext";
import AuthPage from "./pages/AuthPage";
import ViewNotesPage from "./pages/ViewNotesPage";
import CreateEditNotePage from "./pages/CreateEditNotePage";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <NavigationProvider>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/notes" /> : <AuthPage />}
          />
          <Route
            path="/notes"
            element={isAuthenticated ? <ViewNotesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreateEditNotePage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/edit/:noteId"
            element={
              isAuthenticated ? <CreateEditNotePage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </NavigationProvider>
    </Router>
  );
};

export default App;
