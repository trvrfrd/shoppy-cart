(function(exports) {

exports.createCatalog = createCatalog;

const createProduct = require('./product').createProduct;

const catalogProto = {
  getProduct(id) {
    return this._products.find(p => p.id === id);
  },

  map(fn) {
    return this._products.map(product => fn(product));
  }
}

function createCatalog(products, requiredFields = []) {
  var catalog = Object.create(catalogProto);
  catalog._products = products.map(p => createProduct(p, requiredFields));
  return catalog;
}

}(typeof module !== 'undefined' ? module.exports : window));

