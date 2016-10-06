let fs = require('fs')
let url = require('url')

function getContentType (filepath) {
  let contentType

  if (filepath.endsWith('.css')) {
    contentType = 'text/css'
  } else if (filepath.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (filepath.endsWith('.html')) {
    contentType = 'text/html'
  } else if (filepath.endsWith('.jpg')) {
    contentType = 'image/jpg'
  }

  return contentType
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (!req.pathname.startsWith('/content')) {
    console.error(`Forbidden resource, url: ${req.pathname}`)

    res.writeHead(403)
    res.write('403 Forbidden')
    res.end()

    return true
  }

  let filepath = '.' + req.pathname

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err)

      res.writeHead(404)
      res.write('404 NOT FOUND')
      res.end()

      return true // handler does not support request
    }

    let contentType = getContentType(filepath)

    if (!contentType) {
      console.error('Non-supported file format requested.')

      res.writeHead(415)
      res.write('415 UNSUPPORTED MEDIA TYPE')
      res.end()

      return true
    }

    res.writeHead(200, {
      'Content-Length': data.length,
      'Content-Type': contentType,
      'Connection': 'keep-alive',
      'Accept': '*/*'
    })
    res.write(data)
    res.end()
  })
}
