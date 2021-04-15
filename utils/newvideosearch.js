require('dotenv').config();
// how to search by either url or unique video_id
const ytApiKey = process.env.API_SECRET;
const fetch = require("node-fetch");

const newVideoSearch =  (hobby) =>{
    const baserequestURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
 // must include literal with keywords spaced with '+' inbetween these two parts
    const tailrequestURL = '&type=video&maxResults=5&videoCaption=closedCaption&key='
 // must include ytApiKey literal
    const keywords = hobby;
    console.log(keywords)
    const keywordArr = keywords.split(" ")
    console.log(keywordArr)
    const keywordSearch = keywordArr.join('+')

    const videoSearch = `${baserequestURL}${keywordSearch}${tailrequestURL}${ytApiKey}`
    console.log(videoSearch)
let status;
let results;
fetch(videoSearch)
.then((res) => { 
    status = res.status; 
    return res.json() 
  })
  .then((jsonData) => {
    results = jsonData
    // console.log("results: ", results);
    console.log("api search status: ", status);
    // console.log("items:", results.items)
    const searchResults = results.items
    return searchResults
  })
  .catch((err) => {
    // handle error
    console.error(err);
  });




// .then(console.log(res.items))
// .then(res => res.json())
// .then(json => console.log(json))
// .then (json.map(data))
// .then(console.log(data))


// const hobbies = hobbyData.map((hobby) => hobby.get({ plain: true }));


// .then(function (response){ 
//         if (response.ok) {
//         console.log(results.items)
//        const searchResults = results.items
//         console.log(searchResults)
//         return searchResults 
//         }
//         if(error){
//             console.log(error)
//         }
//     })

}

module.exports = newVideoSearch