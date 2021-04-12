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



const postHobby = async (event) => {
    event.preventDefault();
    const hobbyName = document.querySelector('#hobbyName').value.trim();
    try{
      const response = await fetch('/api/new', {
        method: 'POST',
        body: JSON.stringify({hobbyName}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }catch(error){
        res.status(400)
    }
  };

  const youtubeSearch =  (event) =>{
    event.preventDefault();
    const ytApiKey = 'AIzaSyChSlx47AsnYWpyeqc12NWX-llOKZTQjzI'
    const baserequestURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
 // must include literal with keywords spaced with '+' inbetween these two parts
    const tailrequestURL = '&type=video&videoCaption=closedCaption&key='
 // must include ytApiKey literal
    const keywords = document.querySelector('#keywords').value.trim();
    console.log(keywords)
    const keywordArr = keywords.split(" ")
    console.log(keywordArr)
    const keywordSearch = keywordArr.join('+')

    const hobbySearch = `${baserequestURL}${keywordSearch}${tailrequestURL}${ytApiKey}`
    console.log(hobbySearch)

fetch(hobbySearch)
    .then(function (response){ 
        if (response.ok) {
        console.log(response)
        response.json().then(function (hobbyVideos) {
            console.log(hobbyVideos)
            displayVideos(hobbyVideos)
            return hobbyVideos;
        })
    }
  })
}



document.querySelector('.new-notes-form').addEventListener('submit', addNotesHandler);

/*Need to pull from hobbyData 
response.id.videoId to return unique video identifier, 
response.snippet.title for the video title, 
response.snippet.description, 
response.snippet.thumbnails.standard(or let it default)
response.snippet.thumbnails.url*/

// displayVideos = (hobbyVideos) =>{
// move to utils
// /* trying to put the response objects into separate arrays to be looped through and rendered. 
// maybe for each hobbyVideos grab specific keys then render them in a particular html element by id
// */
// const videos = []
// videos.push(hobbyVideos)
// console.log(videos)
// // need loop through videos and create html elements to contain specified elements of each object. 
// for (var i = 0; i < videos.length; i++){

// }

// }


// video save button that triggers a backend POST route to save videos to a hobby and user req.body should include
// title, url, thumbnail, 
