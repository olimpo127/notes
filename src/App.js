// App.js
import React, { useState } from 'react';
import './App.css';

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <span className="note-content">{note.content}</span>
      <button onClick={() => onDelete(note.id)} className="note-delete-btn">
        Delete
      </button>
    </div>
  );
};

const NoteForm = ({ onAddNote }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;
    onAddNote({
      id: Date.now(),
      content,
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your note..."
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Note App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} onDelete={handleDeleteNote} />
    </div>
  );
};

export default App;
