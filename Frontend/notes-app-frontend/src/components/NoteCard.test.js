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
    expect(screen.getByText('Sample Note')).toBeInTheDocument();
    expect(screen.getByText('This is a sample description for the note.')).toBeInTheDocument();
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
    expect(screen.getByText('Play Audio')).toBeInTheDocument();
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
    expect(screen.queryByText('Play Audio')).not.toBeInTheDocument();
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
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalled();
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
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it('calls onPlayAudio when the "Play Audio" button is clicked', () => {
    render(
      <NoteCard
        note={note}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onPlayAudio={mockOnPlayAudio}
      />
    );
    fireEvent.click(screen.getByText('Play Audio'));
    expect(mockOnPlayAudio).toHaveBeenCalledWith(note.audio);
  });
});