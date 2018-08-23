'use strict'

const cheerio = require('cheerio')
const getIt = require('./GetIt')
const fs = require('fs')

module.exports = {

  parsedValues: [],

  baseURL: "",

  totalPages: 10,

  parseBaseURL(base, data) {
    this.baseURL = base

    for (let i = 1; i <= this.totalPages; i++) {

      const url = `${this.baseURL}/latest-news?page=${i}`

      getIt.fetchSiteData(url)
        .then(data => this.parseAPage(data,i))
        .catch(err => console.err("error in parseBaseURL", err))
    }

  },

  parseAPage(data,i) {


    const $ = cheerio.load(data)
    var anchors = []

    $('h2.media__headline a').each(function () {
      anchors.push($(this).attr("href"))
    })
    const promises = []

    anchors.forEach(anchor => {
      promises.push(getIt.fetchSiteData(this.baseURL + anchor))

    })
    Promise.all(promises)
      .then(res => {
        this.parseSubURLs(res)
      })
      .catch(err => console.error("Promise.all error", err))

  },

  parseSubURLs(data) {

    data.forEach(page => {
      const $ = cheerio.load(page)
      let src = $('#main-content .figure__head img').attr('src')
      if (src) {
        src = src.slice(2)
        src = src.split('?')[0]
      }

      const headline = $('.article__headline').text()
      const author = $('.byline.byline--article').find('a').text()

      const content = $('.article__body').find('p').text()

      this.parsedValues.push({src, headline, author, content})

    })
 
  }

}