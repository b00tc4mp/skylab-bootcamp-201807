'use strict'

const logic = require('.')
logic.side = 'server'
const { expect } = require('chai')
const FormData = require('form-data');
const fs = require('fs');

describe('logic', () => {

  // describe('register', () => {

  //   it('should register on valid credentials', () => {

  //     const username = 'user-' + Math.random(), password = '123'

  //     return logic.register(username, password)
  //       .then(res => {
  //         expect(res).to.equal('user registered')
  //       })
  //   })

  //   it('should fail on trying to register an already registered user', () => {

  //     const username = 'user-' + Math.random(), password = '123'

  //     return logic.register(username, password)
  //       .then(() => {
  //         logic.register(username, password)
  //           .catch(error => error)
  //           .then(error => {
  //             expect(error).to.exists
  //             expect(error.message).to.equal(`user ${username} already exists`)
  //           })
  //       })
  //   })
  // })

  // describe('authenticate', () => {

  //   const username = 'user-' + Math.random(), password = '123'
  //   before(() => {
  //     return logic.register(username, password)
  //   })

  //   it('should authenticate on correct credentials', () => {
  //     return logic.authenticate(username, password)
  //       .then(res => {
  //         expect(res).to.equal('user authenticated')

  //         expect(logic._userUsername).to.equal(username)
  //       })
  //   })

  //   it('should fail on wrong credentials', () => {
  //     return logic.authenticate(username, 'grillo')
  //       .catch(error => expect(error.message).to.equal('wrong credentials'))
  //   })

  // })

  // describe('upload file', () => {

  //   const username = 'user-' + Math.random(), password = '123'
  //   before(() => {
  //     return logic.register(username, password)
  //       .then(() => logic.authenticate(username, password))
  //   })

  //   it('should upload file correctly', () => {

  //     const data = new FormData();
  //     data.append('upload', fs.createReadStream(__dirname + '/test.txt'));

  //     return logic.uploadFile(logic._userUsername, data)
  //       .then(res => {
  //         expect(res).to.equal('file saved')
  //       })
  //   })
  // })

  // describe('list file', () => {

  //   const username = 'user-' + Math.random(), password = '123'
  //   const data = new FormData();
  //   data.append('upload', fs.createReadStream(__dirname + '/test.txt'));

  //   before(() => {
  //     return logic.register(username, password)
  //       .then(() => logic.authenticate(username, password))
  //       .then(() => logic.uploadFile(logic._userUsername, data))
  //   })

  //   it('should list correctly all files of the user', () => {

  //     return logic.listFile(logic._userUsername)
  //       .then(files => {
  //         expect(files).to.be.an('array')
  //         expect(files.length).to.equal(1)
  //         expect(files).to.include('test.txt');
  //       })
  //   })
  // })

  describe('download file', () => {

      const username = 'user-' + Math.random(), password = '123'
      const data = new FormData();
      data.append('upload', fs.createReadStream(__dirname + '/test.txt'));
  
      before(() => {
        return logic.register(username, password)
          .then(() => logic.authenticate(username, password))
          .then(() => logic.uploadFile(logic._userUsername, data))
      })
  
      it('should download correctly a file of the user', () => {
  
        return logic.retrieveFile(logic._userUsername, 'test.txt')
          .then(res => {
            expect(res).to.be.an('object')
            expect(res.data).to.equal('Test to upload file')
          })
      })
    })

  // describe('delete file', () => {

  //   const username = 'user-' + Math.random(), password = '123'
  //   const data = new FormData();
  //   data.append('upload', fs.createReadStream(__dirname + '/test.txt'));

  //   before(() => {
  //     return logic.register(username, password)
  //       .then(() => logic.authenticate(username, password))
  //       .then(() => logic.uploadFile(logic._userUsername, data))
  //   })

  //   it('should delete correctly a file of the user', () => {

  //     return logic.deleteFile(logic._userUsername, 'test.txt')
  //       .then(res => {
  //         expect(res).to.equal('file deleted')
  //       })
  //   })
  // })

})