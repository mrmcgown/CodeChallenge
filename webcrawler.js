"use strict"

const internet1 = require("./internet1")
const internet2 = require("./internet2")

let webCrawler = function(data) {
  let availableAddresses = []
  let success = []
  let skipped = []
  let error = []

  let linkProcessor = function(links) {
    let waiting = []

    for (let i = 0; i < links.length; i++) {
      if (availableAddresses.indexOf(links[i]) == -1) {
        error.push(links[i])
      } else if (
        success.indexOf(links[i]) !== -1 &&
        skipped.indexOf(links[i]) == -1
      ) {
        skipped.push(links[i])
      } else if (
        availableAddresses.indexOf(links[i]) !== -1 &&
        success.indexOf(links[i]) == -1
      ) {
        success.push(links[i])
        waiting.push(links[i])
      }
    }

    for (let i = 0; i < waiting.length; i++) {
      let pageIndex = data.pages.map(page => page.address).indexOf(waiting[i])
      linkProcessor(data.pages[pageIndex].links)
    }
  }

  for (let i = 0; i < data.pages.length; i++) {
    availableAddresses.push(data.pages[i].address)
  }

  success.push(data.pages[0].address)

  linkProcessor(data.pages[0].links)

  console.log(`Success: ${success}
    Skipped: ${skipped}
    Error: ${error}`)
}
webCrawler(internet1)
