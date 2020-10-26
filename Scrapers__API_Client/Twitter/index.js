
require('dotenv').config()
var Twit = require('twit')

var T = new Twit({
  consumer_key:         process.env.consumer,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_secret_token,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


T.get('search/tweets', { q: 'trump', count: 100 }, function(err, data, response) {
  for(i=0; i<data.statuses.length;i++){
    console.log("------------------" + i + "---------------------")
    console.log(data.statuses[i].user.name + "      @" + data.statuses[i].user.screen_name);
    console.log("__________________");
    console.log(data.statuses[i].text);
    console.log(data.statuses[i].created_at);
    console.log("------------------------------------------")
  }
  // console.log(Object.keys(data))
  // console.log(Object.keys(data.search_metadata))
  // console.log(typeof(data.statuses))
})