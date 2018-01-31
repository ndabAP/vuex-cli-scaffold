const chai = require('chai')
const assert = chai.assert
const write = require('./../src/helper/write')
const fs = require('fs')
const fsExtra = require('fs-extra')

describe('write.js', function () {
  after(function () {
    fsExtra.removeSync('./test/tmp')
  })

  it('should write a file', function () {
    fs.mkdirSync('./test/tmp')

    write('./test/tmp/test', 'test')

    fs.readFile('./test/tmp/test', 'utf8', (error, contents) => {
      assert.equal(contents, 'test')
    })
  })
})
