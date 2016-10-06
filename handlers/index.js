let favicon = require('./favicon')
let homePage = require('./home-page')
let addImage = require('./add-image')
let images = require('./images')
let statusHeader = require('./status-header')
let staticFiles = require('./static-files')

module.exports = [
  favicon,
  statusHeader,
  homePage,
  addImage,
  images,
  staticFiles
]
