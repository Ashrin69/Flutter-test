document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    const notesContainer = document.getElementById('notes-container');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');

    addNoteButton.addEventListener('click', () => {
        const title = noteTitleInput.value;
        const content = noteContentInput.value;

        if (title.trim() !== '' && content.trim() !== '') {
            createNote(title, content);
            noteTitleInput.value = '';
            noteContentInput.value = '';
        }
    });

    function createNote(title, content) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        noteElement.appendChild(titleElement);
        noteElement.appendChild(contentElement);

        notesContainer.appendChild(noteElement);
    }
});
