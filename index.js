var fs = require('fs')
var DatAPI = require('dat-api-client')
var Editor = require('table-editor')
var activeChange = false;

var dat = DatAPI({ 
  url: 'http://127.0.0.1:6461',
  user: 'foo',
  pass: 'bar'
})

var editor = new Editor({
  el: 'main-content',
  template: fs.readFileSync('./table.html', 'utf8')
})

dat.info(init)

function init (err, res, info) {
  dat.get(function (err, res, body) {
    editor.set({
      name: info.name,
      description: info.description,
      publisher: info.publisher
    })

    editor.import(body.rows)
    editor.on('change', changes)
  })
}

function changes (change) {
  if (activeChange) return;
  
  Object.keys(change).forEach(function (key) {
    var rowID = key.split('.')[1];
    var row = editor.getRow(rowID);

    dat.put(row, { force:true }, function (err, res, body) {
      activeChange = true;
      editor.setCell(rowID, 'version', body.version);
      activeChange = false;
    });
  });
}