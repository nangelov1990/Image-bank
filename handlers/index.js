var favicon = require('./favicon')
var homePage = require('./home-page')
var addImage = require('./add-image')
var images = require('./images')
var statusHeader = require('./status-header')
var staticFiles = require('./static-files')

module.exports = [
  favicon,
  statusHeader,
  homePage,
  addImage,
  images,
  staticFiles
]
