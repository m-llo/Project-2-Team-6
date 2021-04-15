require('dotenv').config();
// how to search by either url or unique video_id
const fetch = require("node-fetch");
const ytApiKey = process.env.API_SECRET;

const savedVideoSearch =  (videoId) =>{
    const baserequestURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
 // must include literal with keywords spaced with '+' inbetween these two parts
    const tailrequestURL = '&type=video&maxResults=10&videoCaption=closedCaption&key='
 // must include ytApiKey literal
    const YTID = videoId;
    const videoSearch = `${baserequestURL}${YTID}${tailrequestURL}${ytApiKey}`
    console.log(videoSearch)
    

fetch(videoSearch)
    .then(function (response){ 
        if (response.ok) {
        console.log(response)
        response.json()
        return response
        }
    })

}

module.exports = savedVideoSearch
