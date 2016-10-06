let fs = require('fs')

module.exports = (req, res) => {
  if (req.headers['status-header'] === 'Full') {
    fs.readFile('./content/partials/image-count.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err)

        return
      }

      let pageTop = data.split('#')[0]
      let pageBottom = data.split('#')[1]
      let images = require('./add-image').images
      let imagesCount = Object.keys(images).length

      let html = pageTop +
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
