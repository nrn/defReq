var http = require('http')
  , test = require('tape')
  , defReq = require('../defReq')

var server = http.createServer(function (req, res) {
  res.statusCode = 200
  if (req.method === 'POST') return res.end('asdf')
  else res.end('ok')
}).listen(4652)

test('defReq', function (t) {
  var example = defReq({ uri: 'http://localhost:4652'})
    , example2 = defReq('http://localhost:4652')

  t.plan(4)

  example(function (e, res, body) {
    t.same(body, 'ok', 'All Defaults')
  })

  example({ method: 'POST' }, function (e, res, body) {
    t.same(body, 'asdf', 'Mixin')
  })

  example().on('end', function () { t.ok(true, 'Acts like a stream')})

  example2(function (e, res, body) {
    t.same(body, 'ok', 'String, All Defaults')
  })

}).on('end', function () {
  server.close()
})

