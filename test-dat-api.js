var test = require('tape');
var DatAPI = require('./dat-api')

var dat = DatAPI({ remote: 'http://127.0.0.1:6461' })

test('get dat repo info', function (t) {
  dat.info(function (err, res, body) {
    t.ok(body, 'dat repo info response ok')
    t.end()
  })
})

test('post rows', function (t) {
  dat.postRows({ wee: 'foo' }, function (err, res, body) {
    t.ok(body, 'post response body ok')
    t.equals(body.wee, 'foo')
    t.end()
  })
})

test('get rows', function (t) {
  dat.rows(function (err, res, rows) {
    t.ok(rows, 'rows object exists')
    t.end()
  })
})

test('get row', function (t) {
  dat.postRows({ wee: 'foo' }, function (err, res, body) {
    dat.row(body.key, function (err, res, row) {
      t.ok(row, 'row object exists')
      t.equals(row.wee, 'foo')
      t.end()
    })
  })
})

test('post bulk csv data', function (t) {
  var csv = 'wee,woo\n1,a\n2,b\n3,c'
  
  dat.bulk(csv.toString(), { type: 'csv' }, function (err, res, body) {
    t.ok(body, 'bulk response ok')
    t.end()
  })
})




/*

dat.getBlob('foo', 'z119.jpg', function (err, res, body) {
  console.log(err, res, body)
})

var style = require('fs').readFileSync('style.css')

var opts = { 
  key: 'foo', 
  filename: 'style.css', 
  body: style.toString(), 
  version: 14 
}

dat.postBlob(opts, function (err, res, body) {
  console.log(err, res)
})

dat.csv(function (err, res, csv) {
  console.log(csv)
})

var csv = require('fs').readFileSync('csv.csv');
dat.bulk(csv.toString(), { type: 'csv' }, function (err, res, body) {
console.log(err, body)
})

*/