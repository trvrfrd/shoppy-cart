(function(exports) {

exports.renderStore = renderStore;

function renderStore(rootNode, store) {
  var list = createElement('ul');

  var listItems = store.map(renderProduct);
  listItems.forEach(function(item) { list.appendChild(item) });

  list.addEventListener('click', function(e) {
    handleAddToCart(store, e);
  });

  rootNode.appendChild(list);
}

function handleAddToCart(store, originalEvent) {
  if (originalEvent.target.tagName === 'BUTTON') {
    var id = parseInt(originalEvent.target.dataset.id, 10);
    var productData = store.getProduct(id);
    var addEvent = new CustomEvent('add-to-cart', {
      detail: productData,
      bubbles: true
    });

    originalEvent.target.dispatchEvent(addEvent);
  }
}

function renderProduct(product) {
  var item = createElement('li', { className: 'product' });

  var header = createElement('div', { className: 'product-header' });
  header.appendChild(createElement('h3', {
    text: capitalize(product.type)
  }));
  header.appendChild(createElement('span', {
    className: 'price',
    text: displayPrice(product.price)
  }));

  var button = createElement('button', { text: 'Add to Cart' });
  button.dataset.id = product.id;
  header.appendChild(button);

  item.appendChild(header);

  item.appendChild(createElement('p', {
    className: 'product-description',
    text: product.description
  }));

  return item;
}

function capitalize(str) {
  return str.split(' ').map(function(word) {
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');
}

}(typeof module !== 'undefined' ? module.exports : window));
