(function(exports) {

exports.createCart = createCart;

function createCart() {
  var _items = [];

  function _getItemTotal(item) {
    return item.quantity * item.price;
  }

  function _getItem(id) {
    return _items.find(i => i.id === id);
  }

  function _checkItemProps(item) {
    if (item.id == undefined) throw new Error('Item must have an id attribute to be added to cart');
    if (item.price == undefined) throw new Error('Item must have a price attribute to be added to cart');
  }

  return {
    addItem(item) {
      _checkItemProps(item);
      // should price get updated each add? what if it has changed in Catalog?
      item = _getItem(item.id) || { quantity: 0, id: item.id, price: item.price };
      if (item.quantity === 0) _items.push(item);
      item.quantity += 1;
    },

    updateQuantity(id, quantity) {
      var item = _getItem(id);
      if (item) item.quantity = quantity;
    },

    removeItem(id) {
      var item = _getItem(id);
      if (item) {
        var index = _items.indexOf(item);
        _items.splice(index, 1);
      }
    },

    clear() {
      _items = [];
    },

    getTotalPrice() {
      return _items.reduce((sum, item) => sum + _getItemTotal(item), 0);
    },

    getTotalQuantity() {
      return _items.reduce((quantity, item) => quantity + item.quantity, 0);
    },

    map(fn) {
      return _items.map(item => fn(Object.assign({}, item)));
    }
  }
}

}(typeof module !== 'undefined' ? module.exports : window));

