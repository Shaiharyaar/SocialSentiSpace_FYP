const spawn = require('child_process').spawn;

const process = spawn('python', ['./YoutubeCommentsScraper.py', 'https://www.youtube.com/watch?v=3Pzni2yfGUQ'])


process.stdout.on('data', data => {
    // myStr = data.toString();
    myJson = JSON.parse(data);
    for(i=0 ; i<=myJson.Comments.length-1 ;i++){
        console.log("-----------------------------------")
        console.log(myJson.Comments[i])
        console.log(myJson.User_Name[i])
        console.log("-----------------------------------")
    }
})