(function() {

var cart = null;
var itemsContainer = null;
var countContainer = null;
var clearButton = null;

window.cartUI = {
  init: function init(cartInstance, options) {
    cart = cartInstance;
    itemsContainer = options.itemsContainer;
    countContainer = options.countContainer;
    clearButton = options.clearButton;
    render();
    addEventListeners();
  }
}

function addEventListeners() {
  document.body.addEventListener('add-to-cart', function(e) {
    cart.addItem(e.detail);
    render();
  });

  document.body.addEventListener('remove-from-cart', function(e) {
    cart.removeItem(e.detail.id);
    render();
  });

  clearButton.addEventListener('click', function() {
    cart.clear();
    render();
  });
}

function render() {
  renderItems();
  renderCount();
}

function renderItems() {
  itemsContainer.innerHTML = '';

  var container;

  if (cart.getTotalQuantity() === 0) {
    container = createElement('p', { text: 'There are no items in your cart.' });
  } else {
    container = createElement('table');
    container.appendChild(renderHeader());
    var rows = cart.map(renderItem);
    rows.forEach(function(row) { container.appendChild(row) });
    container.appendChild(renderTotal(cart));
  }

  container.className = 'cart-items';
  itemsContainer.appendChild(container);
}

function renderItem(item) {
  var tr = createElement('tr', { className: 'cart-item' });
  tr.insertCell().textContent = capitalize(item.type);
  tr.insertCell().textContent = displayPrice(item.price);
  tr.insertCell().textContent = item.quantity;
  tr.insertCell().appendChild(removeButton(item));

  return tr;
}

function removeButton(item) {
  var button = createElement('button', { text: 'Remove' });
  button.addEventListener('click', function(originalEvent) {
    var removeEvent = new CustomEvent('remove-from-cart', {
      detail: { id: item.id },
      bubbles: true
    });
    originalEvent.target.dispatchEvent(removeEvent);
  });

  return button;
}

function renderHeader() {
  var tr = createElement('tr');
  tr.appendChild(createElement('th', { text: 'Type' }));
  tr.appendChild(createElement('th', { text: 'Price' }));
  tr.appendChild(createElement('th', { text: 'Qty' }));
  tr.appendChild(createElement('th'));

  return tr;
}

function renderTotal(cart) {
  var tr =  createElement('tr', { className: 'cart-count' });
  tr.insertCell().textContent = 'Total: ' + displayPrice(cart.getTotalPrice());

  return tr;
}

function renderCount() {
  var count = cart.getTotalQuantity();
  var message = count + (count === 1 ? ' item' : ' items');
  countContainer.innerHTML = message;
}

}());
