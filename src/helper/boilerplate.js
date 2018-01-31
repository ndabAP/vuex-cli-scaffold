const fs = require('fs')
const path = require('path')

module.exports = boilerplate = targetDirectory => {
  const sep = path.sep
  const initializeDirectory = path.isAbsolute(targetDirectory) ? sep : ''

  targetDirectory.split(sep).reduce((parentDirectory, childDirectory) => {
    const currentDirectory = path.resolve(parentDirectory, childDirectory)
    if (!fs.existsSync(currentDirectory)) fs.mkdirSync(currentDirectory)

    return currentDirectory
  }, initializeDirectory)
}