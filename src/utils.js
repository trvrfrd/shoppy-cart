(function(exports) {

exports.createElement = createElement;
exports.displayPrice = displayPrice;

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

}(window));
