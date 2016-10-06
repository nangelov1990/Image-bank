let url = require('url')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/images/')) {
    let images = require('./add-image').images

    if (!images) {
      let errorMessage = `<h3>No images yet.</h3>`
      let html = pageTop + errorMessage + pageBottom

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
      let listOfImages = `  <h2>ALL IMAGES</h2>
  <ul>`

      for (let key in images) {
        listOfImages += `<li><a href="/images/${key}">${images[key].name}</a></li>`
      }

      listOfImages += `  </ul>`

      let html = pageTop +
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
      let urlIndex = req.pathname.split('/') // Get image index
      let imageIndex = urlIndex[urlIndex.length - 1]
      let currentImage = images[imageIndex]

      if (currentImage) {
        let imageView = `  <h2>IMAGE VIEW</h2>
      <span>Name: <a href="${currentImage.url}">${currentImage.name}</a></span><br />    
      <img src="${currentImage.url}" alt="${currentImage.name}">`

        let html = pageTop +
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
        let notFoundMessage = `<h3>ERROR: 404. IMAGE NOT FOUND</h3>`
        let html = pageTop +
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

let pageTop = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>image-base</title>
</head>
<body>
  <a href="/">Home</a>`
let pageBottom = `</body>
</html>`
