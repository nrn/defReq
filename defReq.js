// defReq
var request = require('request')

module.exports = defReq

function defReq (def) {
  if (typeof def !== 'object') return request
  return function (opts, cb) {
    if (!opts) opts = def
    else {
      Object.keys(def).forEach(function (key) {
        if (typeof opts[key] === 'undefined') opts[key] = def[key]
      })
    }
    return request(opts, cb)
  }
}

