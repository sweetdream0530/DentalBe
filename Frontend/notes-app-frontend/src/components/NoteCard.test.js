import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from './NoteCard';  // Adjust the import if necessary

describe('NoteCard', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnPlayAudio = jest.fn();

  const note = {
    id: 1,
    title: 'Sample Note',
    description: 'This is a sample description for the note.',
    audio: 'audio-file.mp3',  // Audio file path or URL
  };

  it('renders the note title and description correctly', () => {
    render(
      <NoteCard
        note={note}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );

    // Check if title and description are rendered
    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(note.description)).toBeInTheDocument();
  });

  it('renders the "Play Audio" button when audio is available', () => {
    render(
      <NoteCard
        note={note}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );

    // Check if the "Play Audio" button is rendered
    const playButton = screen.getByText(/Play Audio/);
    expect(playButton).toBeInTheDocument();

    // Simulate the "Play Audio" button click
    fireEvent.click(playButton);

    // Ensure the onPlayAudio function was called with the correct audio file
    expect(mockOnPlayAudio).toHaveBeenCalledWith(note.audio);
  });

  it('does not render the "Play Audio" button when there is no audio', () => {
    const noteWithoutAudio = { ...note, audio: null };

    render(
      <NoteCard
        note={noteWithoutAudio}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );

    // Check if the "Play Audio" button is not rendered
    const playButton = screen.queryByText(/Play Audio/);
    expect(playButton).toBeNull();
  });

  it('calls onEdit when the "Edit" button is clicked', () => {
    render(
      <NoteCard
        note={note}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );

    // Simulate the "Edit" button click
    const editButton = screen.getByText(/Edit/);
    fireEvent.click(editButton);

    // Ensure the onEdit function was called with the correct note
    expect(mockOnEdit).toHaveBeenCalledWith(note);
  });

  it('calls onDelete when the "Delete" button is clicked', () => {
    render(
      <NoteCard
        note={note}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );

    // Simulate the "Delete" button click
    const deleteButton = screen.getByText(/Delete/);
    fireEvent.click(deleteButton);

    // Ensure the onDelete function was called with the correct note ID
    expect(mockOnDelete).toHaveBeenCalledWith(note.id);
  });
});
