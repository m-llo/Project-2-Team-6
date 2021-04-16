// // Add Nodes
// const addNotesHandler=async (event) =>{
//       event.preventDefault();
//       const title = document.querySelector('#dish_name').value.trim;
//       const text = document.querySelector('#description').value.trim;
//       try{
//         const response = await fetch('/api/notes',{
//           method:'POST',
//           body: JSON.stringify({
//             title,
//             text,
//           }),
//           headers:{
//             'Content-Type': 'application/json',
//           },
//         });
//         // if the note is added, 
//         if (response.ok) {
//           document.location.replace('/');
//         } else {
//           alert('Failed to add notes');
//         }
//       } catch(err){
//         res.status(500);
//       }
// }
// document.querySelector('.new-notes-form').addEventListener('submit', addNotesHandler);

// Hobby routes ----------------------------------------------------------------------

const postHobby = async (event) => {
  console.log('saving hobby')  
  event.preventDefault();
    const hobbyName = document.querySelector('#hobby-name').value.trim();
    console.log(hobbyName)
    try{
      const response = await fetch('/api/dashboard/new/hobby', {
        method: 'POST',
        body: JSON.stringify({name: hobbyName}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // res.redirect('/')
        document.location.replace('/');
      } else {
        alert('Failed to save hobby');
      }
    }catch(error){
      console.log(error) 
      return 
      // status(400)
    }
  };

  // const deleteHobby = async (event) => {
  //   const hobbyId = document.querySelector('.hobbyId');
  //   const user_id = req.sesson.user_id
  //   console.log("deleting hobby: ", hobbyId, "where user_id: ", user_id)
  //   try{
  //     const response = await fetch('/api/dashboard/delete', {
  //       method: 'DELETE',
  //       body: JSON.stringify({
  //         id:  hobbyId ,
  //         user_id: user_id
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });if (response.ok) {
  //       res.status(200);
  //       alert("Hobby succesffully deleted from playlist.")
  //       document.location.replace('/');
  //     } else {
  //       alert('Failed to delete hobby');
  //     }
  //   }catch(error){
  //       res.status(400)
  //   }
  // };

  const deleteHobby = async (event) => {
    console.log("Delete function called");
    if (event.target.hassAttribute('data-confirm')) {
      const id = event.target.getAttribute('eventHobby');

      const response = await fetch(`/api/hobby/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Could not delete hobby from list');
      }
    }
  };

  const getHobbyPlaylist = async () => {
    const hobby_Name = document.querySelector('.savedHobbyName');
    const hobby_Id = document.querySelector('.savedHobby')
    const hobbyName = hobby_Name.textContent
    const hobbyId = hobby_Id.dataset.id;
    console.log(hobbyName);
    console.log(hobbyId);
    
     
     
        document.location.replace(`/playlist/${hobbyId}`)
    
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

  const getNewVideos = async (event) => {
    event.preventDefault();
    const hobby = document.querySelector('#hobby-name').value.trim();
   console.log('redirecting to new videos for ' , hobby);
    console.log('new url: ', `/newvideos/${hobby}` )
    document.location.replace(`/newvideos/${hobby}`)
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
    console.log('youtube id: ', video.snippet.youtube_id);
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



  document
  .querySelector('.savedHobby')
  .addEventListener('click', getHobbyPlaylist)

  
  

    // document
    // .querySelector('.saved-Hobbies')
    // .addEventListener('delete', deleteHobby);

  document
    .querySelector('#saveHobby')
    .addEventListener('submit', postHobby);

    document
    .querySelector('#newVidSearch')
    .addEventListener('click', getNewVideos); 

    document
    .querySelector('.savedVidView')
    .addEventListener('submit', viewSavedVideo)
   
    document
    .querySelector('.deleteVid')
    .addEventListener('delete', deleteVideo);
    

    document
    .querySelector('.deleteHobby')
    .addEventListener('delete', deleteHobby);

    document
    .querySelector('.newVidSave')
    .addEventListener('submit', postVideo)
