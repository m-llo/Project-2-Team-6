require('dotenv').config();
// how to search by either url or unique video_id
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
        console.log(response)
        response.json()
        return response
        }
    })

}

module.exports = {savedVideoSearch, newVideoSearch}