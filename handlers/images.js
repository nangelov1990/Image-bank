var url = require('url')
var fs = require('fs')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/images/')) {
    var images = require('./add-image').images

    fs.readFile('./content/partials/images.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      var pageTop = data.split('#')[0]
      var pageBottom = data.split('#')[1]
      var html

      if (!images) {
        var errorMessage = `<h3>No images yet.</h3>`
        html = pageTop + errorMessage + pageBottom

        res.writeHead(200, {
          'Content-Length': html.length,
          'Content-Type': 'text/html',
          'Connection': 'keep-alive',
          'Accept': '*/*'
        })
        res.write(html)
        res.end()

        return
      }

      if (req.pathname.endsWith('all')) {
        var listOfImages = `  <h2>ALL IMAGES</h2>
    <ul>`

        for (var key in images) {
          listOfImages += `<li><a href="/images/${key}">${images[key].name}</a></li>`
        }

        listOfImages += `  </ul>`

        html = pageTop +
          listOfImages +
          pageBottom

        res.writeHead(200, {
          'Content-Length': html.length,
          'Content-Type': 'text/html',
          'Connection': 'keep-alive',
          'Accept': '*/*'
        })
        res.write(html)
        res.end()
      } else {
        var urlIndex = req.pathname.split('/') // Get image index
        var imageIndex = urlIndex[urlIndex.length - 1]
        var currentImage = images[imageIndex]

        if (currentImage) {
          var imageView = `  <h2>IMAGE VIEW</h2>
        <span>Name: <a href="${currentImage.url}">${currentImage.name}</a></span><br />    
        <img src="${currentImage.url}" alt="${currentImage.name}">`

          html = pageTop +
            imageView +
            pageBottom

          res.writeHead(200, {
            'Content-Length': html.length,
            'Content-Type': 'text/html',
            'Connection': 'keep-alive',
            'Accept': '*/*'
          })
          res.write(html)
          res.end()
        } else {
          var notFoundMessage = `<h3>ERROR: 404. IMAGE NOT FOUND</h3>`
          html = pageTop +
            notFoundMessage +
            pageBottom

          res.writeHead(404)
          res.write(html)
          res.end()
        }
      }
    })
  } else {
    return true
  }
}
