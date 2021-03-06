const hobbySearch =  (hobby) =>{
    const ytApiKey = process.env.API_SECRET;
    const baserequestURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
 // must include literal with keywords spaced with '+' inbetween these two parts
    const tailrequestURL = '&type=video&maxResults=5&videoCaption=closedCaption&key='

 // must include ytApiKey literal
    const keywords = hobby.tolowercase();
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
            return hobbyVideos;
        })
    }
  })
}

module.exports = hobbySearch