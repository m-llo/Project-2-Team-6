// Add Nodes
const addNotesHandler=async (event) =>{
    event.preventDefault();
    const title = document.querySelector('#dish_name').value.trim;
    const text = document.querySelector('#description').value.trim;
    try{
      const response = await fetch('/api/notes',{
        method:'POST',
        body: JSON.stringify({
          title,
          text,
        }),
        headers:{
          'Content-Type': 'application/json',
        },
      });
      // if the note is added, 
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add notes');
      }
    } catch(err){
      res.status(500);
    }
}





document.querySelector('.new-notes-form').addEventListener('submit', addNotesHandler);