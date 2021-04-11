
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();

// Hobby routes ----------------------------------------------------------------------
const postHobby = async (event) => {
    event.preventDefault();
    const hobbyName = document.querySelector('#hobbyName').value.trim();
    try{
      const response = await fetch('/api/dashboard/new/hobby', {
        method: 'POST',
        body: JSON.stringify({hobbyName}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to save hobby');
      }
    }catch(error){
        res.status(400)
    }
  };

  const deleteHobby = async () => {
    const hobbyId = document.querySelector('.hobbyId');
    try{
      const response = await fetch('/api/dashboard/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          id:  hobbyId
        }),
        headers: { 'Content-Type': 'application/json' },
      });if (response.ok) {
        res.status(200);
        alert("Hobby succesffully deleted from playlist.")
        document.location.replace('/');
      } else {
        alert('Failed to delete hobby');
      }
    }catch(error){
        res.status(400)
    }
  };


// Videos routes ------------------------------------------------- 
  const postVideo = async () => {
    const videoTitle = document.querySelector('.videoCardTitle');
    const videoThumbnail = document.querySelector('.videoCardThumbnail');
    const videoDescription = document.querySelector('.videoCardDesc');
    const videoURL = document.querySelector('.videoCardURL');
    const videoYTID = document.querySelector('.videoCardYTID');
    const hobbyName = document.querySelector('#hobbyName').value.trim();
    
    try{
     const getHobbyId = await fetch (`/api/dashboard/gethobby/${hobbyName}`)
      const response = await fetch('/api/videos/save', {
        method: 'POST',
        body: JSON.stringify({
          title: videoTitle,
          youtube_id: videoYTID,
          URL: videoURL,
          thumbnail: videoThumbnail,
          description: videoDescription,
          hobby_id: getHobbyId
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to save video');
      }
    }catch(error){
        res.status(400)
    }
  };

  const getNewVideos = async () => {
    const hobbyName = document.querySelector('#hobbyName').value.trim();
    
    try{
      const response = await fetch('/api/videos/', {
        method: 'POST',
        body: JSON.stringify({
          name: hobbyName
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }catch(error){
        res.status(400)
    }
  };

  const deleteVideo = async () => {
    const ytVideoId = document.querySelector('.savedvideoCardID');
    try{
      const response = await fetch('/api/videos/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          id:  ytVideoId
        }),
        headers: { 'Content-Type': 'application/json' },
      });if (response.ok) {
        res.status(200);
        alert("Video succesffully deleted from playlist.")
        document.location.replace('/');
      } else {
        alert('Failed to delete video from playlist');
      }
    }catch(error){
        res.status(400)
    }
  };


  const viewSavedVideo = async () => {
    const ytVideoId = document.querySelector('.savedvideoCardID');
    
    try{
      const response = await fetch('/api/videos/view', {
        method: 'GET',
        body: JSON.stringify({
          id: ytVideoId
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }catch(error){
        res.status(400)
    }
  };

  const getHobbyPlaylist = async () => {
    const hobbyName = document.querySelector('.savedHobbyName').value.trim();
    try{
      const response = await fetch(`/api/videos/view/playlist`, {
        method: 'GET',
        body: JSON.stringify({
          name: hobbyName
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }catch(error){
        res.status(400)
    }
  };

  document
    .querySelector('.savedHobbyName')
    .addEventListener('click', getHobbyPlaylist);

  document
    .querySelector('.newHobbyForm')
    .addEventListener('submit', postHobby, getNewVideos);

    document
    .querySelector('.videoCardBody')
    .addEventListener('submit', postVideo);
    
    document
    .querySelector('.videoCardBody')
    .addEventListener('delete', deleteVideo);

    document
    .querySelector('.deleteHobby')
    .addEventListener('delete', deleteHobby);

    document
    .querySelector('.savedVidView')
    .addEventListener('submit', viewSavedVideo);
