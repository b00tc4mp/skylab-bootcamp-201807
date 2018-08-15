'use strict'

const logic = require('.')
const fs = require("fs")
const { expect } = require('chai')
const dataPath = '../../../../files-api/data'
const rmDirRecursiveSync = require('../../../../files-api/utils/rm-dir-recursive-sync')

function clean() {
    if (fs.existsSync(dataPath))
        rmDirRecursiveSync(dataPath)

    fs.mkdirSync(dataPath)

    fs.writeFileSync(`${dataPath}/users.json`, '{}')
}
beforeEach(() => {

    clean()

})

describe('register user', () => {
    const username = 'gerard' + Math.random(),
        password = '123'

    it('should register on correct data', () => {
        return logic.registerUser(username,password)
            .then(res => {expect(JSON.stringify(res)).to.equal(JSON.stringify({"message":"user registered"}))})
    })
})

describe('login user', () => {
    const username = 'gerard' + Math.random(),
        password = '123'

        beforeEach(() => {
           return logic.registerUser(username, password)
        })

    it('should login on correct data', () => {
        return logic.authUser(username,password)
            .then(res => {expect(JSON.stringify(res)).to.equal(JSON.stringify({"message":"user authenticated"}))})
    })
})

describe(' upload file', () => {
    const username = 'gerard' + Math.random(),
        password = '123'

        beforeEach(() => {
           return logic.registerUser(username, password)
        })

    it('should upload a file correctly', () => {
        debugger
        const buf = fs.createReadStream(("./test-file.txt"))
        // console.log(buf)
        // const buf = new Buffer()
        // const fileName = "test-file.txt"
        return logic.uploadFile(username,buf)
            .then(res => expect(res.message).to.equal(`file saved`))
    })
})

after(() => {
    clean()
})