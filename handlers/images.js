var url = require('url')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/images/')) {
    var images = require('./add-image').images

    if (!images) {
      var errorMessage = `<h3>No images yet.</h3>`
      var html = pageTop + errorMessage + pageBottom

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

      var html = pageTop +
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

        var html = pageTop +
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
        var html = pageTop +
          notFoundMessage +
          pageBottom

        res.writeHead(404)
        res.write(html)
        res.end()
      }
    }
  } else {
    return true
  }
}

var pageTop = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>image-base</title>
</head>
<body>
  <a href="/">Home</a>`
var pageBottom = `</body>
</html>`
