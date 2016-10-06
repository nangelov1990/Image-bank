var fs = require('fs')
var url = require('url')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile('./content/partials/index.html', (err, data) => {
      if (err) {
        console.error(err)

        res.writeHead(404)
        res.write('404 NOT FOUND')
        res.end()

        return
      }

      res.writeHead(200, {
        'Content-Length': data.length,
        'Content-Type': 'text/html',
        'Connection': 'keep-alive',
        'Accept': '*/*'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true // module does not support request
  }
}
