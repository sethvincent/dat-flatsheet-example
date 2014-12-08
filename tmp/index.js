/**
* issue request from the browser
* run with
* $ browserify index.js | tape-run
**/

var request = require('xhr');
var btoa = require('btoa')
var test = require('tape');
var api = {}

api.postRows = function (url, data, user, pass, cb) {
  var opts = {
    uri: url + '/api/rows',
    method: "POST",
    timeout: 0,
    cors: true,
    json: data,
    headers: {'authorization': 'Basic ' + btoa(user + ':' + pass)}
  }
  request(opts, cb)
}

api.session = function (url, user, pass, cb) {
  var self = this
  var apiUrl = url + '/api/session'
  var options = {
    uri: apiUrl,
    method: 'GET',
    json: true,
    headers: {'authorization': 'Basic ' + btoa(user + ':' + pass)}
  }
  request(options,
    function (err, resp, json) {
      if (err) return cb(err)
      if (json.loggedOut) {
        return cb(new Error('Bad username or password.'))
      }
      return cb(null, resp, json)
    }
  )
}


// SET THESE
var url;
var user;
var pass;


test('a test', function (t) {
  var data = {cool: 'test'}
  api.postRows(url, data, user, pass, function (err, resp, json) {
    console.log(JSON.stringify(json))
    t.end()
  });
});