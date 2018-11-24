const internet1 = require("./internet1")
const internet2 = require("./internet2")

let webCrawler = function(data) {
  let availableAddresses = []
  let waiting = []
  let success = []
  let skipped = []
  let error = []

  let linkProcessor = function(links) {
    // clear the waiting array
    let waiting = []

    /* process links by iterating through each one and running it against a 
    set of conditions 
    */
    for (let i = 0; i < links.length; i++) {
      /* if the link is not in availableAddresses, then push that link to the 
      error array
      */
      if (availableAddresses.indexOf(links[i]) == -1) {
        error.push(links[i])
      } else if (
        /* if the link is already in the success array, but not the skipped array,
      then push that link to the skipped array
      */
        success.indexOf(links[i]) !== -1 &&
        skipped.indexOf(links[i]) == -1
      ) {
        skipped.push(links[i])
      } else if (
        /* if the link is in availableAddresses, but not the success array, then 
      push that link to the success array and the waiting array
      */
        availableAddresses.indexOf(links[i]) !== -1 &&
        success.indexOf(links[i]) == -1
      ) {
        success.push(links[i])
        waiting.push(links[i])
      }
    }

    /* for each address in the waiting array, find that address' index in the 
    pages array of the data object from the argument, then use that index to 
    pass the links associated with that address to linkProcessor()
    */
    for (let i = 0; i < waiting.length; i++) {
      let pageIndex = data.pages.map(page => page.address).indexOf(waiting[i])
      linkProcessor(data.pages[pageIndex].links)
    }
  }

  /* for each page in the pages array of the data object, push the address to
  availableAddresses
  */
  for (let i = 0; i < data.pages.length; i++) {
    availableAddresses.push(data.pages[i].address)
  }

  /* push the first page address to the success array since it is the 
  webCrawler's starting point
  */
  success.push(data.pages[0].address)

  // run linkProcessor() on the set of links from the first page
  linkProcessor(data.pages[0].links)

  return `Success: ${success}
    
    Skipped: ${skipped}
    
    Error: ${error}`
}
