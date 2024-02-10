// Function to retrieve notes from local storage
function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
  }
  
  // Function to save notes to local storage
  function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  // Function to display notes
  function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = getNotes();
  
    notesContainer.innerHTML = '';
  
    notes.forEach((note, index) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <div class="note-title">${note.title}</div>
        <textarea readonly>${note.text}</textarea>
        <div class="note-actions">
          <button onclick="editNote(${index})">Edit</button>
          <button onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
      notesContainer.appendChild(noteDiv);
    });
  }
  
  // Function to add a new note
  function addNote() {
    const noteTitleInput = document.getElementById('note-title');
    const noteTextInput = document.getElementById('note-text');
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteTextInput.value.trim();
    
    if (noteTitle && noteText) {
      const notes = getNotes();
      notes.push({title: noteTitle, text: noteText});
      saveNotes(notes);
      noteTitleInput.value = '';
      noteTextInput.value = '';
      displayNotes();
    }
  }
  
  // Function to edit a note
  function editNote(index) {
    const notes = getNotes();
    const newText = prompt('Edit the note:', notes[index].text);
    if (newText !== null) {
      notes[index].text = newText.trim();
      saveNotes(notes);
      displayNotes();
    }
  }
  
  // Function to delete a note
  function deleteNote(index) {
    const notes = getNotes();
    if (confirm('Are you sure you want to delete this note?')) {
      notes.splice(index, 1);
      saveNotes(notes);
      displayNotes();
    }
  }
  
  // Function to read all notes
  function readNotes() {
    const notes = getNotes();
    alert(notes.map(note => `${note.title}:\n${note.text}`).join('\n\n'));
  }
  
  // Function to clear all notes
  function clearNotes() {
    if (confirm('Are you sure you want to delete all notes?')) {
      localStorage.removeItem('notes');
      displayNotes();
    }
  }
  
  // Function to filter notes by title or content
  function filterNotes() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const notes = getNotes();
    const filteredNotes = notes.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(searchInput);
      const contentMatch = note.text.toLowerCase().includes(searchInput);
      return titleMatch || contentMatch;
    });
    displayFilteredNotes(filteredNotes);
  }
  
  // Function to display filtered notes
  function displayFilteredNotes(filteredNotes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
  
    filteredNotes.forEach((note, index) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <div class="note-title">${note.title}</div>
        <textarea readonly>${note.text}</textarea>
        <div class="note-actions">
          <button onclick="editNote(${index})">Edit</button>
          <button onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
      notesContainer.appendChild(noteDiv);
    });
  }
  
  // Event listener for form submission
  document.getElementById('note-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addNote();
  });
  
  // Initial display of notes
  displayNotes();
  