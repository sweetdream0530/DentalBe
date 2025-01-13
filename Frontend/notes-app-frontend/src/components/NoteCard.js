import React from "react";

const NoteCard = ({ note, onEdit, onDelete, onPlayAudio }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="actions">
        {note.audio && (
          <button onClick={() => onPlayAudio(note.audio)}>Play Audio</button>
        )}
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
