'use strict'

const {expect} = require('chai')
const logic = require('.')
const path = require('path')
const fs = require('fs')

//const rmDirRecursiveSync = require('../utils/rm-dir-recursive-sync')


describe('logic', () => {

 /* function clean() {
    if (fs.existsSync('data'))
      rmDirRecursiveSync('data')

    fs.mkdirSync('data')

  }*/

  describe('register', () => {
    let username, username2, password

    beforeEach(() => {
      username = 'jack' + Math.random().toString() + Math.random().toString()
      password = '123'
      username2 = "bobo"
    })

    it('should register on valid credentials', () => {
      return logic.register(username, password)
        .then(res => expect(res).to.be.true)
    });

    it('should not register on bad username', () => {
      return logic.register("", password)
        .then(res => expect(res).to.be.false)
    });
    it('should not register on bad password', () => {
      return logic.register(username, "")
        .then(res => expect(res).to.be.false)
    });
    it('should not register on bad username and password', () => {
      return logic.register("", "")
        .then(res => expect(res).to.be.false)
    });
  })

  describe('authenticate', () => {
    let username, username2, password
    beforeEach(() => {
      username = 'jack' + Math.random().toString() + Math.random().toString()
      username2 = 'jill' + Math.random().toString() + Math.random().toString()
      password = '123'
      return logic.register(username, password)
    })

    it('should authenticate on valid credentials', () => {
      return logic.authenticate(username, password)
        .then(res => expect(res).to.be.true)
    });
    it('should not authenticate on invalid username', () => {
      return logic.authenticate(username2, password)
        .then(res => expect(res).to.be.false)
    });
    it('should not authenticate on invalid password', () => {
      return logic.authenticate(username, "abcdefg")
        .then(res => expect(res).to.be.false)
    });

    it('should not authenticate on invalid username and password', () => {
      return logic.authenticate(username2, "abcdefg")
        .then(res => expect(res).to.be.false)
    });
  })

  describe('upload files', () => {
    let username, password
    const textFilePath = "src/logic/files/something.txt"
    const imageFilePath = "src/logic/files/vg.png"
    let imageFileName, imageBuffer
    let textFileName, textBuffer
    beforeEach(() => {
      username = 'uploady' + Math.random().toString() + Math.random().toString()
      password = '123'
      return logic.register(username, password)
        .then(() => logic.authenticate(username, password))
        .then(() => {
          imageFileName = imageFilePath.split(path.sep).pop()
          imageBuffer = fs.readFileSync(imageFilePath)
          textFileName = textFilePath.split(path.sep).pop()
          textBuffer = fs.readFileSync(textFilePath)
        })
    })

    it('should upload image file correctly', () => {
      return logic.uploadFile(username, imageBuffer, imageFileName)
        .then(res => expect(res.message).not.to.equal('file saved'))
    });

    it('should upload text file correctly', () => {
      return logic.uploadFile(username, textBuffer, textFileName)
        .then(res => expect(res.message).not.to.equal('file saved'))
    });


  describe('download files', () => {
    let username, password
    const textFilePath = "src/logic/files/something.txt"
    const imageFilePath = "src/logic/files/vg.png"
    let imageFileName, imageBuffer
    let textFileName, textBuffer
    beforeEach(() => {
      username = 'uploady' + Math.random().toString() + Math.random().toString()
      password = '123'
      return logic.register(username, password)
        .then(() => logic.authenticate(username, password))
        .then(() => {
          imageFileName = imageFilePath.split(path.sep).pop()
          imageBuffer = fs.readFileSync(imageFilePath)
          textFileName = textFilePath.split(path.sep).pop()
          textBuffer = fs.readFileSync(textFilePath)
        })
        .then(() => logic.uploadFile(username,imageBuffer,imageFileName))
        .then(() => logic.uploadFile(username,textBuffer,textFileName))
    })

    it('should download image file correctly', () => {
      return logic.downloadFile(username, filename)
        .then(res => expect(res.message).not.to.equal('file saved'))
    });

    it('should download text file correctly', () => {
      return logic.uploadFile(username, textBuffer, textFileName)
        .then(res => expect(res.message).not.to.equal('file saved'))
    });


  })

 /* after(() => {


    clean()
  })*/
})

/*
it('should register on valid credentials', () => {

  logic.register(username, password)


})

it('should fail on trying to register an already registered user', () => {
  logic.register(username, password)

  // let error

  // try {
  //     logic.register(username, password)
  // } catch(err) {
  //     error = err
  // }

  // expect(error).to.exist
  // expect(error.message).to.equal(`user ${username} already exists`)

  expect(() => logic.register(username, password)).to.throw(`user ${username} already exists`)
})

it('should fail on trying to register with an undefined username', () => {
  expect(() => logic.register(undefined, password)).to.throw(`invalid username`)
})

it('should fail on trying to register with an empty username', () => {
  expect(() => logic.register('', password)).to.throw(`invalid username`)
})

it('should fail on trying to register with a numeric username', () => {
  expect(() => logic.register(123, password)).to.throw(`invalid username`)
})

it('should fail on trying to register with an undefined password', () => {
  expect(() => logic.register(username, undefined)).to.throw(`invalid password`)
})

it('should fail on trying to register with an empty password', () => {
  expect(() => logic.register(username, '')).to.throw(`invalid password`)
})

it('should fail on trying to register with a numeric password', () => {
  expect(() => logic.register(username, 123)).to.throw(`invalid password`)
})
})

describe('authenticate', () => {
beforeEach(() => {
  logic._users[username] = { password }
})

it('should authenticate on correct credentials', () => {
  expect(() => logic.authenticate(username, password)).not.to.throw()
})

it('should fail on wrong credentials', () => {
  expect(() => logic.authenticate('pepito', 'grillo')).to.throw('user pepito does not exist')
})

it('should fail on wrong password', () => {
  expect(() => logic.authenticate(username, '456')).to.throw('wrong credentials')
})

it('should fail on trying to authenticate with an undefined username', () => {
  expect(() => logic.authenticate(undefined, password)).to.throw(`invalid username`)
})

it('should fail on trying to authenticate with an empty username', () => {
  expect(() => logic.authenticate('', password)).to.throw(`invalid username`)
})

it('should fail on trying to authenticate with a numeric username', () => {
  expect(() => logic.authenticate(123, password)).to.throw(`invalid username`)
})

it('should fail on trying to authenticate with an undefined password', () => {
  expect(() => logic.authenticate(username, undefined)).to.throw(`invalid password`)
})

it('should fail on trying to authenticate with an empty password', () => {
  expect(() => logic.authenticate(username, '')).to.throw(`invalid password`)
})

it('should fail on trying to authenticate with a numeric password', () => {
  expect(() => logic.authenticate(username, 123)).to.throw(`invalid password`)
})
})

describe('list files', () => {
beforeEach(() => {
  logic._users[username] = { password }

  fs.mkdirSync(`data/${username}`)
  fs.mkdirSync(`data/${username}/files`)
  fs.writeFileSync(`data/${username}/files/README.md`, '# documentation')
  fs.writeFileSync(`data/${username}/files/hello-world.txt`, 'hello world!')
  fs.mkdirSync(`data/${username}/files/folder`)
})

it('should list files if they exist', () => {
  const files = logic.listFiles(username)

  expect(files).to.exist
  expect(files.length).to.equal(3)

  expect(files.includes('README.md')).to.be.true
  expect(files.includes('hello-world.txt')).to.be.true
  expect(files.includes('folder')).to.be.true
})
})

after(() => {
// logic._users = {}
// logic._persist() // TODO: test it!

clean()
})*/
