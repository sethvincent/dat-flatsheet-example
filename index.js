var DatAPI = require('dat-api-client')
var Editor = require('flatsheet-editor')

var dat = DatAPI({ remote: 'http://127.0.0.1:6461' })

var table
dat.info(init)

function init (err, res, info) {
  dat.get(function (err, res, body) {
    table = new Editor(body.rows, {
      el: 'main-content',
      name: info.name,
      description: info.description,
      publisher: info.publisher
    })

    table.editor.on('change', changes)
  })
}

function changes (change) {
  Object.keys(change).forEach(function (key) {
    var row = table.getRow(key.split('.')[1])
    row.version++
    dat.postRows(row, function (err, res, body) {
      console.log(err, body)
    })
  })
}