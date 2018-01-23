(function(exports) {

exports.createCart = createCart;

function createCart(items = []) {
  return {
    getItem(index) {
      return items[index];
    },

    addItem(product) {
      items.push(product);
    }
  }
}

}(typeof module !== 'undefined' ? module.exports : window));

