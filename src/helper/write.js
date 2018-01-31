const fs = require('fs')

module.exports = write = (fileName, contents) => {
  fs.writeFile(fileName, contents, error => {
    if (error) throw new Error(error)
  })
}
