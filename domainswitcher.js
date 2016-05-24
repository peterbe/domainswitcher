var urlparse = function(url) {
  var parser = document.createElement('a')
  parser.href = url
  return parser
}

var matchedDomain = function(url) {
  var domain = urlparse(url).host
  // XXX make this config. Not everyone works on mozilla websites.
  if (/(allizom|mozilla)\.(org|com)$/.test(domain)) {
    return true
  }
  return false
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return
  }
  if (!matchedDomain(changeInfo.url)) {
    return
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.pageAction.show(tabId)
  })
})

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   console.log('Current tab to start', tabs[0].url)
// })

// Happens when you click on a tab that was already loaded but not focused.
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   // console.log("Activated tab", activeInfo)
//   // reset(activeInfo.tabId)
// })


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  reset(tabs[0].id)
})

function reset(tabId) {
  chrome.pageAction.hide(tabId)
}
