var submit = function(destination) {
  if (!destination.trim().length) {
    return;
  }
  animateDots();
  chrome.tabs.executeScript(null, {
    file: "/content_scripts/domainswitch.js"
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {destination: destination});
  });
};


var animateDots = function() {
  var el = document.querySelector('#loading');
  var dots = 0;
  setInterval(function() {
    el.textContent = Array(dots++ % 5 + 1).join('.');
  }, 400);
};

document.addEventListener("submit", function(e) {
  e.preventDefault();
  var destination = document.querySelector('#domain').value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var key = makeKey(tabs[0].url);
    var memory = load();

    if (memory[key] && memory[key].length) {
      if (memory[key].indexOf(destination) === -1) {
        memory[key].unshift(destination);
      }
    } else {
      memory[key] = [destination];
    }
    save(memory);
    submit(destination);
  });

});

var load = function() {
  return JSON.parse(localStorage.getItem('domainswitcher') || '{}');
};

var save = function(stuff) {
  localStorage.setItem('domainswitcher', JSON.stringify(stuff));
};

var makeKey = function(url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser.protocol + parser.hostname;
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // console.log('Current tab:', tabs[0].url);
  var memory = load();
  var key = makeKey(tabs[0].url);
  console.log("DURING LOADING", memory);
  if (memory[key]) {
    document.querySelector('#domain').value = memory[key][0];

    var alternatives = document.querySelector('#alternatives');
    if (memory[key].length > 1) {
      memory[key].forEach(function(alternative, notfirst) {
        if (notfirst) {
          var button = document.createElement('button');
          button.classList.add('alternative');
          button.textContent = alternative;
          button.addEventListener('click', function(event) {
            event.preventDefault();
            submit(alternative);
          });
          alternatives.appendChild(button);
        }
      });
      alternatives.style.display = 'block';
    } else {
      alternatives.style.display = 'none';
    }
  }

});
