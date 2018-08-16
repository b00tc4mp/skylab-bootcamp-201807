'use strict'

const { expect } = require('chai')
const fs = require('fs')
const rimraf = require('rimraf')
const rmDirRecursiveSync = require('.')

debugger

describe('rm dir recursive sync', () => {
    beforeEach(() => {
        rimraf.sync('tests')

        fs.mkdirSync('tests')
        fs.writeFileSync('tests/README.md', '# documentation')
        fs.writeFileSync('tests/hello-world.txt', 'hello world!')
        fs.mkdirSync('tests/empty-folder')
        fs.mkdirSync('tests/folder')
        fs.writeFileSync('tests/folder/README.md', '# documentation')
        fs.writeFileSync('tests/folder/hello-world.txt', 'hello world!')
        fs.mkdirSync('tests/folder/empty-folder')
        fs.mkdirSync('tests/folder/folder')
        fs.writeFileSync('tests/folder/folder/README.md', '# documentation')
        fs.writeFileSync('tests/folder/folder/hello-world.txt', 'hello world!')
        fs.mkdirSync('tests/folder/folder/empty-folder')
    })

    it('should delete recursively', () => {
        expect(fs.existsSync('tests')).to.be.true
        expect(fs.existsSync('tests/README.md')).to.be.true
        expect(fs.existsSync('tests/hello-world.txt')).to.be.true
        expect(fs.existsSync('tests/empty-folder')).to.be.true
        expect(fs.existsSync('tests/folder')).to.be.true
        expect(fs.existsSync('tests/folder/README.md')).to.be.true
        expect(fs.existsSync('tests/folder/hello-world.txt')).to.be.true
        expect(fs.existsSync('tests/folder/empty-folder')).to.be.true
        expect(fs.existsSync('tests/folder/folder')).to.be.true
        expect(fs.existsSync('tests/folder/folder/README.md')).to.be.true
        expect(fs.existsSync('tests/folder/folder/hello-world.txt')).to.be.true
        expect(fs.existsSync('tests/folder/folder/empty-folder')).to.be.true

        rmDirRecursiveSync('tests')

        expect(fs.existsSync('tests')).to.be.false
    })
})