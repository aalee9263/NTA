
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
            <textarea>${note}</textarea>
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
        const noteInput = document.getElementById('note');
        const noteText = noteInput.value.trim();
        if (noteText) {
          const notes = getNotes();
          notes.push(noteText);
          saveNotes(notes);
          noteInput.value = '';
          displayNotes();
        }
      }
  
      // Function to edit a note
      function editNote(index) {
        const notes = getNotes();
        const newText = prompt('Edit the note:', notes[index]);
        if (newText !== null) {
          notes[index] = newText.trim();
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
        alert(notes.join('\n'));
      }
  
      // Function to clear all notes
      function clearNotes() {
        if (confirm('Are you sure you want to delete all notes?')) {
          localStorage.removeItem('notes');
          displayNotes();
        }
      }
  
      // Event listener for form submission
      document.getElementById('note-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addNote();
      });
  
      // Initial display of notes
      displayNotes();