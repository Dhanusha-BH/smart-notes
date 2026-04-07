import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Study");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Add or Update Note
  const addNote = () => {
    if (!title || !desc) return;

    if (editId) {
      // UPDATE
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, title, desc, category }
            : note
        )
      );
      setEditId(null);
    } else {
      // CREATE
      const newNote = {
        id: Date.now(),
        title,
        desc,
        category,
        important: false,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setDesc("");
  };

  // Delete Note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Toggle Important
  const toggleImportant = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, important: !note.important }
          : note
      )
    );
  };

  // Edit Note
  const editNote = (note) => {
    setTitle(note.title);
    setDesc(note.desc);
    setCategory(note.category);
    setEditId(note.id);
  };

  // Search Filter
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🧠 Smart Notes App</h1>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Study</option>
          <option>Work</option>
          <option>Personal</option>
        </select>

        <button onClick={addNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Search */}
      <input
        className="search"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Notes */}
      <div className="notes">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`card ${note.important ? "important" : ""}`}
          >
            <h3>{note.title}</h3>
            <p>{note.desc}</p>
            <small>{note.category}</small>

            <div className="actions">
              <button onClick={() => editNote(note)}>✏️</button>
              <button onClick={() => toggleImportant(note.id)}>⭐</button>
              <button onClick={() => deleteNote(note.id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;