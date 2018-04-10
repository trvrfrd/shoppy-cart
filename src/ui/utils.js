exports.createElement = createElement;
exports.displayPrice = displayPrice;
exports.capitalize = capitalize;

function createElement(tagName, options) {
  options = options || {};
  var element = document.createElement(tagName);
  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  return element;
}

function displayPrice(num) {
  return '$' + parseFloat(num).toFixed(2);
}

function capitalize(str) {
  return str.trim().split(' ').map(function(word) {
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');
}

