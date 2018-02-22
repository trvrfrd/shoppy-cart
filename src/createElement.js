(function(exports) {

exports.createElement = createElement;

function createElement(tagName, options) {
  options = options || {};
  var element = document.createElement(tagName);
  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  return element;
}

}(window));
