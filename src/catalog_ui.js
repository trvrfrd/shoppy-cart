(function(exports) {

exports.renderCatalog = renderCatalog;

function renderCatalog(rootNode, catalog) {
  var list = document.createElement('ul');

  var listItems = catalog.map(renderProduct);
  listItems.forEach(function(item) { list.appendChild(item) });

  rootNode.appendChild(list);
}

function createElement(tagName, options) {
  var element = document.createElement(tagName);
  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  return element;
}

function renderProduct(product) {
  var item = createElement('li', { className: 'product' });

  var header = createElement('div', { className: 'product-header' });
  header.appendChild(createElement('h3', { text: 'Chocolate Type' }));
  header.appendChild(createElement('span', {
    className: 'price',
    text: '$' + parseFloat(product.price).toFixed(2)
  }));
  header.appendChild(createElement('button', { text: 'Add to Cart' }));

  item.appendChild(header);

  item.appendChild(createElement('p', {
    className: 'product-description',
    text: product.description
  }));

  return item;
}

}(typeof module !== 'undefined' ? module.exports : window));
