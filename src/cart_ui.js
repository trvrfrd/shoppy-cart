(function(exports) {

exports.renderModalCart = renderModalCart;
exports.renderCartCount = renderCartCount;

function renderModalCart(rootNode, cart) {
  rootNode.innerHTML = '';

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
  var tr = createElement('tr', { className: 'cart-item' });

  tr.appendChild(createElement('td', { text: item.type }));
  tr.appendChild(createElement('td', { text: displayPrice(item) }));
  tr.appendChild(createElement('td', { text: item.quantity}));
  tr.appendChild(createElement('td'));
  tr.lastChild.appendChild(createElement('button', { text: 'Remove' }));
  return tr;
}

function renderHeader() {
  var tr = createElement('tr', { className: 'cart-item' });

  tr.appendChild(createElement('th', { text: 'Type' }));
  tr.appendChild(createElement('th', { text: 'Price' }));
  tr.appendChild(createElement('th', { text: 'Qty' }));
  tr.appendChild(createElement('th'));
  return tr;
}

function renderCartCount(rootNode, cart) {
  var count = cart.getTotalQuantity();
  var message = count + (count === 1 ? ' item' : ' items');
  rootNode.innerHTML = message;
}

}(typeof module !== 'undefined' ? module.exports : window));
