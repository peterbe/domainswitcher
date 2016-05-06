/*
switcheroo():
Gets called when user has chosen a destination.
*/
function switcheroo(request, sender, sendResponse) {
  // not sure why this is done or needed
  chrome.runtime.onMessage.removeListener(switcheroo);

  var goto = document.createElement('a');
  goto.href = request.destination;
  var newDestination = goto.protocol +
    '//' +
    goto.host +
    document.location.pathname +
    document.location.search +
    document.location.hash
  ;
  document.location.href = newDestination;

}


/*
Assign switcheroo() as a listener for messages from the extension.
*/
chrome.runtime.onMessage.addListener(switcheroo);
