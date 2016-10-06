var url = require('url')
var query = require('querystring')

var images = {}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.method === 'POST') {
    var body = ''

    req.on('data', (data) => { body += data })
    req.on('end', () => {
      var image = query.parse(body)

      var emptyName = image.name === '' || undefined
      var emptyUrl = image.url === '' || undefined

      if (emptyName ||
          emptyUrl) {
        res.writeHead(400)
        res.write('400 BAD REQUEST: INPUT DATA')
        res.end()

        return
      }

      console.log(image.name)
      console.log(image.url)

      var counter = Object.keys(images).length
      images[counter] = image
      console.log(images)

      res.writeHead(200)
      res.write(`<a href="/">Back</a></li>
      <h2>Image added.</h2>`)
      res.end()

      module.exports.images = images
    })
  } else {
    return true
  }
}
