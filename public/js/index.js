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
          document.location.replace('/');
      } else {
        alert('Failed to save hobby');
      }
    }catch(error){
      console.log(error) 
      return 
      
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


//  const deleteHobby = () => {
  const hobbyDeleteButton = $(".deleteHobby");
$(hobbyDeleteButton).on("click", function () {
  const hobbyID = $(this).val();
  console.log('value: ', hobbyID)
  console.log("Deleting Hobby: ", hobbyID )
  
  const response = fetch(`/api/dashboard/hobby/delete/${hobbyID}`, {
    method: 'DELETE',
  });
    alert("Hobby playlist succesffully deleted.")
    document.location.replace('/');
});
//  }

  // const deleteHobby = async (event) => {
  //   console.log("Delete function called");
  //   if (event.target.hassAttribute('data-confirm')) {
  //     const id = event.target.getAttribute('eventHobby');

  //     const response = await fetch(`/api/hobby/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       document.location.replace('/dashboard');
  //     } else {
  //       alert('Could not delete hobby from list');
  //     }
  //   }
  // };




// Videos routes ------------------------------------------------- 
  const postVideo = async () => {
    const videoTitle = document.querySelector('.videoCardTitle').textContent;
    const videoThumbnail = document.querySelector('.videoCardThumbnail').textContent;
    const videoYTID = document.querySelector('.videoCardYTID').textContent;
    const hobbyName = document.querySelector('#hobby_name').textContent;
    console.log("Saving Video: ", videoTitle, "to", hobbyName)
    try{
      const response = await fetch('/api/videos/save', {
        method: 'POST',
        body: JSON.stringify({
          title: videoTitle,
          youtube_id: videoYTID,
          thumbnail: videoThumbnail,
          hobbyName:hobbyName
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert("video Saved")
      } else {
        alert('Failed to save video, Please make sure to create your playlist first');
      }
    }catch(error){
      console.log(error)
    }
  };

  const getNewVideos = async (event) => {
    event.preventDefault();
    const hobby = document.querySelector('#hobby-name').value.trim();
   console.log('redirecting to new videos for ' , hobby);
    console.log('new url: ', `/newvideos/${hobby}` )
    document.location.replace(`/newvideos/${hobby}`)
  };

  const vidDeleteButton = $(".deleteVid");
  
  $(vidDeleteButton).on("click", function () {
    const ytID = $(this).val();
    console.log('value: ', ytID)
    // var ytIDAttr = $(this).attr("value")
    // console.log('attr: ',ytIDAttr)
    console.log("Deleting Video: ", ytID )
    const response = fetch(`/api/videos/delete/${ytID}`,{
      method: 'DELETE',
    })
      alert("Video succesffully deleted from playlist.")
      document.location.replace('/');
});



  // const deleteVideo = async () => {
    
  //   const video = document.querySelector('savedvideoCardYTID');
  //   const ytID = video.getAttribute('value')
  //   console.log("Deleting Video: ", ytID )
  //   try{
  //     const response = await fetch(`/api/videos/delete/${ytVideoId}`)
  //     // , {
  //       // method: 'DELETE',
  //       // body: JSON.stringify({
  //       //   id:  ytVideoId
  //       // }),
  //       // headers: { 'Content-Type': 'application/json' },
  //     // }
      
  //     if (response.ok) {
  //       alert("Video succesffully deleted from playlist.")
  //       document.location.replace('/');
  //     } else {
  //       alert('Failed to delete video from playlist');
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // };


  // const viewSavedVideo = async () => {
  //   const ytVideoId = document.querySelector('.savedvideoCardYTID').textContent;
    
  //   try{
  //     const response = await fetch('/api/videos/view', {
  //       method: 'GET',
  //       body: JSON.stringify({
  //         id: ytVideoId
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //   }catch(error){
  //       console.log(error)
  //   }
  // };


  document
    .querySelector('#saveHobby')
    .addEventListener('click', postHobby);

    document
    .querySelector('#newVidSearch')
    .addEventListener('click', getNewVideos); 

    // const videoDeleteButtons = document.querySelectorAll('.deleteVid')
    // videoDeleteButtons.forEach((el,idx)=>{
    //   el.addEventListener('click', deleteVideo)
    // })
    

  // const deltetHobbyButtons = document.querySelectorAll('.deleteHobby')
  // deltetHobbyButtons.forEach((el,idx)=>{
  //     el.addEventListener('click', deleteHobby)
  //   })


  const saveButtons = document.querySelectorAll('.newVidSave')
  saveButtons.forEach((el,idx)=>{
    el.addEventListener('click', postVideo)
    
  })

