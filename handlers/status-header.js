var fs = require('fs')

module.exports = (req, res) => {
  if (req.headers['status-header'] === 'Full') {
    fs.readFile('./content/partials/image-count.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err)

        return
      }

      var pageTop = data.split('#')[0]
      var pageBottom = data.split('#')[1]
      var images = require('./add-image').images
      var imagesCount = Object.keys(images).length

      var html = pageTop +
        imagesCount +
        pageBottom

      res.writeHead(200, {
        'Content-Length': html.length,
        'Content-Type': 'text/html',
        'Connection': 'keep-alive',
        'Accept': '*/*'
      })
      res.write(html)
      res.end()
    })
  } else {
    return true
  }
}
