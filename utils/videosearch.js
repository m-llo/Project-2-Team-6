
// how to search by either url or unique video_id
const videoSearch =  (video) =>{
    const ytApiKey = 'AIzaSyChSlx47AsnYWpyeqc12NWX-llOKZTQjzI'
    const baserequestURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
 // must include literal with keywords spaced with '+' inbetween these two parts
    const tailrequestURL = '&type=video&maxResults=10&videoCaption=closedCaption&key='
 // must include ytApiKey literal
    const keywords = video;
    // console.log(keywords)
    // const keywordArr = keywords.split(" ")
    // console.log(keywordArr)
    // const keywordSearch = keywordArr.join('+')

    const videoSearch = `${baserequestURL}${keywords}${tailrequestURL}${ytApiKey}`
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

module.exports = videoSearch