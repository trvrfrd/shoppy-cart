(function(exports) {

exports.renderCart = renderCart;

function renderCart(rootNode, cart) {
  if (rootNode.querySelector('.cart-items')) rootNode.querySelector('.cart-items').remove();

  var container;

  if (cart.getTotalQuantity() === 0) {
    container = createElement('p', { text: 'There are no items in your cart.' });
  } else {
    container = createElement('table');
    container.appendChild(renderHeader());
    var rows = cart.map(renderItem);
    rows.forEach(function(row) { container.appendChild(row) });
  }

  container.className = 'cart-items';
  rootNode.appendChild(container);
}

function renderItem(item) {
  var li = createElement('tr', { className: 'cart-item' });

  li.appendChild(createElement('td', { text: item.type }));
  li.appendChild(createElement('td', { text: displayPrice(item) }));
  li.appendChild(createElement('td', { text: item.quantity}));
  li.appendChild(createElement('td', { text: 'Remove' }));
  return li;
}

function renderHeader() {
  var li = createElement('tr', { className: 'cart-item' });

  li.appendChild(createElement('th', { text: 'Type' }));
  li.appendChild(createElement('th', { text: 'Price' }));
  li.appendChild(createElement('th', { text: 'Qty' }));
  li.appendChild(createElement('th'));
  return li;
}

function displayPrice(product) {
  return '$' + parseFloat(product.price).toFixed(2);
}

}(typeof module !== 'undefined' ? module.exports : window));
