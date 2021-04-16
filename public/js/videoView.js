// Add Nodes
saveNoteBtn = document.querySelector('.save-note');

const handleNoteSave=async (event) =>{
 
  console.log('saving notes')
  event.preventDefault();

    
    const title = document.querySelector('#note-title').value;
    const text = document.querySelector('#note-textarea').value;
    const videos_id =document.querySelector('#videoID').textContent;

    console.log(videos_id);

    try{
      const response = await fetch('/api/notes/save',{
        method:'POST',
        body: JSON.stringify({
          title:title,
          text:text,
          videos_id:1
        }),
        headers:{
          'Content-Type': 'application/json',
        },
      });
      // if the note is added, 
      if (response.ok) {
        // document.location.replace('/');
         document.location.replace(`/video/${videos_id}`)
      } else {
        alert('Failed to add notes');
      }
    } catch(err){
      res.status(500);
      return
    }
}


// const delButtonHandler =  (id) => {
//   const videos_id =document.querySelector('#videoID').textContent;
  
//     const response = await fetch(`/api/notes/delete/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace(`/video/${videos_id}`)
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };
const deleteNote = async (event) => {
  console.log("Delete function called");
  event.stopPropagation();
  
  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note'));
  console.log(noteId);
  

    const response = await fetch(`/api/notes/delete/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
      });
    

    if (response.ok) {
      const videos_id =document.querySelector('.videoid').textContent;
      document.location.replace(`/video/${videos_id}`);
    } else {
      alert('Could not delete note from list');
    }
  
};


saveNoteBtn.addEventListener('click', handleNoteSave);


const deltetNoteButtons = document.querySelectorAll('.delete-note')
deltetNoteButtons.forEach((el,idx)=>{
      el.addEventListener('click', deleteNote)
    })

