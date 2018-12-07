"use strict"

const internet1 = require("./internet1")
const internet2 = require("./internet2")

let webCrawler = function(internet) {
  let availableAddresses = []
  let success = []
  let skipped = []
  let error = []
  let pages = internet.pages

  for (let i = 0; i < pages.length; i++) {
    availableAddresses.push(internet.pages[i].address)
  }

  let parser = function(address) {
    if (!availableAddresses.includes(address) && !error.includes(address)) {
      error.push(address)
    } else if (!skipped.includes(address) && success.includes(address)) {
      skipped.push(address)
    } else if (!success.includes(address)) {
      success.push(address)
    }
  }

  parser(pages[0].address)

  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < pages[i].links.length; j++) {
      parser(pages[i].links[j])
    }
  }

  console.log(`Success Array: ${success}

  Skipped Array: ${skipped}

  Error Array: ${error}`)
}

webCrawler(internet1)
