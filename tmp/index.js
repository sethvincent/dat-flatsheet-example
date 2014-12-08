var request = require('xhr');

var opts = { 
  uri: 'http://127.0.0.1:6461/api/rows', 
  method: "POST", 
  timeout: 0, 
  body: { wat: 'cool' }, 
  cors: true, 
  json: true
}

request(opts, function(err, resp, body) {
  console.log(body)
})