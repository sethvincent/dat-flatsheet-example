var request = require('request')
var qs = require('querystring')
var btoa = require('btoa')

module.exports = DatAPI

function DatAPI (opts, cb) {
  if (!(this instanceof DatAPI)) return new DatAPI(opts, cb)
  this.remote = opts.remote
}

DatAPI.prototype.info = function (cb) {
  return this._req('', 'get', null, {}, cb)
}

DatAPI.prototype.row = function (key, opts, cb) {
  return this._req('rows/' + key, 'get', null, opts, cb)
}

DatAPI.prototype.rows =
DatAPI.prototype.getRows = function (opts, cb) {
  return this._req('rows', 'get', null, opts, cb)
}

DatAPI.prototype.postRows = function (data, opts, cb) {
  return this._req('rows', 'post', data, opts, cb)
}

DatAPI.prototype.getBlob = function (opts, cb) {
  var uri = 'rows/' + opts.key + '/' + opts.filename
  return this._req(uri, 'get', null, opts, cb)
}

DatAPI.prototype.postBlob = function (blob, opts, cb) {
  opts.timeout = 0
  var uri = 'rows/' + opts.key + '/' + opts.filename
  return this._req(uri, 'post', blob, opts, cb)
}

DatAPI.prototype.diff = 
DatAPI.prototype.changes = function (opts, cb) {
  return this._req('changes', 'get', null, opts, cb)
}

DatAPI.prototype.csv = function (opts, cb) {
  return this._req('csv', 'get', null, opts, cb)
}

DatAPI.prototype.bulk = function (data, opts, cb) {
  opts.timeout = 0
  return this._req('bulk', 'post', data, opts, cb)
}

DatAPI.prototype.session = function (opts, cb) {
  if (opts.user && opts.pass) {
    opts.headers = { 
      authorization: 'Basic ' + btoa(opts.user + ':' + opts.pass)
    }
    delete opts.user
    delete opts.pass
  }
  return this._req('session', 'get', null, opts, cb)
}

DatAPI.prototype.login = function (opts, cb) {
  if (opts.user && opts.pass) {
    opts.headers = { 
      authorization: 'Basic ' + btoa(opts.user + ':' + opts.pass)
    }
    delete opts.user
    delete opts.pass
  }
  return this._req('login', 'get', null, opts, cb)
}

DatAPI.prototype.logout = function (cb) {
  return this._req('logout', 'get', null, {}, cb)
}

DatAPI.prototype._req = function (resource, method, data, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    var opts = {}
  }

  opts || (opts = {})
  var query = opts.query || {}

  if (opts.limit) query.limit = opts.limit
  if (opts.start) query.start = opts.start
  if (opts.gt) query.gt = opts.gt
  if (opts.lt) query.lt = opts.lt
  if (opts.gte) query.gte = opts.gte
  if (opts.lte) query.lte = opts.lte
  if (opts.reverse) query.reverse = opts.reverse
  if (opts.version) query.version = opts.version
  if (opts.style) query.style = opts.style
  if (opts.data) query.data = opts.data
  if (opts.since) query.since = opts.since
  if (opts.tail) query.tail = opts.tail
  if (opts.live) query.live = opts.live

  if (data) opts.body = data

  opts.uri = this.remote + '/api/' + resource + '?' + qs.stringify(query)
  opts.method = method
  opts.json = true
  opts.cors = true

  if (opts.type) {
    opts.headers = {}
    if (opts.type === 'csv') opts.headers['content-type'] = 'text/csv'
    if (opts.type === 'json') opts.headers['content-type'] = 'application/json'
  }

  if (!cb) return request(opts)
  else request(opts, cb)
}
