let url = require('url')
let query = require('querystring')

let images = {}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.method === 'POST') {
    let body = ''

    req.on('data', (data) => { body += data })
    req.on('end', () => {
      let image = query.parse(body)

      let emptyName = image.name === '' || undefined
      let emptyUrl = image.url === '' || undefined

      if (emptyName ||
          emptyUrl) {
        res.writeHead(400)
        res.write('400 BAD REQUEST: INPUT DATA')
        res.end()

        return
      }

      console.log(image.name)
      console.log(image.url)

      let counter = Object.keys(images).length
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
