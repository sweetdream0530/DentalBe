// ViewNotesPage.js
import React, { useState, useEffect } from "react";
import { fetchNotes, deleteNote } from "../services/api";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";

const ViewNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotes = async () => {
      const { data } = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleEditNote = (noteId) => {
    navigate(`/edit/${noteId}`);
  };


  const handleAudioPlay = (audioUrl) => {
    new Audio(audioUrl).play();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleCreateNote = () => {
    navigate("/create"); // Navigate to the Create/Edit page for a new note
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <div className="container">
        {/* Add the "Create Note" button here */}
        <button onClick={handleCreateNote}>Create Note</button>

        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => handleEditNote(note.id)}
              onDelete={handleDeleteNote}
              onPlayAudio={handleAudioPlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewNotesPage;
