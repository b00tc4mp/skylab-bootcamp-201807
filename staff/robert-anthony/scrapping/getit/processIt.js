'use strict'

const cheerio = require('cheerio')
const getIt = require('./getIt')
const fs = require('fs')

module.exports = {

  parsedValues: [],

  baseURL: "",

  totalPages: 10,

  parseBaseURL(base) {
    this.baseURL = base
    const promises = []
    for (let i = 1; i <= 10; i++) {

      const url = `${this.baseURL}/latest-news?page=${i}`

      promises.push(getIt.fetchSiteData(url)
        .then(data => (this.parsePages(data)))
      )
    }
    return Promise.all(promises)
      .then(() =>  this.parsedValues)
  },

  parsePages(data) {
    const $ = cheerio.load(data)
    var anchors = []
    const promises = []

    $('h2.media__headline a').each(function () {
      anchors.push($(this).attr("href"))
    })

    anchors.forEach(anchor => {
      console.log(anchor)
      promises.push(getIt.fetchSiteData(this.baseURL + anchor))

    })

    return Promise.all(promises)
      .then((data) => this.parsePageData(data))

  },


  parsePageData(data) {
    return Promise.resolve()
      .then(() => {
        data.forEach(page => {
          if (page === undefined) debugger
          const $ = cheerio.load(page)
          let src = $('#main-content .figure__head img').attr('src')
          if (src) {
            src = src.slice(2)
            src = src.split('?')[0]
          }

          const headline = $('.article__headline').text()
          const author = $('.byline.byline--article').find('a').text()

          const content = $('.article__body').find('p').text()

          return this.parsedValues.push({src, headline, author, content})

        })

      })


  }

}