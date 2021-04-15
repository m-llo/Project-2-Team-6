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

fetch(videoSearch)
    .then(function (response){ 
        if (response.ok) {
        console.log(results.items)
       const searchResults = results.items
        console.log(searchResults)
        return searchResults 
        }
        if(error){
            console.log(error)
        }
    })

}

module.exports = newVideoSearch