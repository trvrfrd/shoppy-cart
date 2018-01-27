(function(exports) {

exports.createCatalog = createCatalog;

function createCatalog(products, requiredFields = []) {
  products = products.map(p => createProduct(p, requiredFields));

  return {
    getProduct(id) {
      return products.find(p => p.id === id);
    },

    map(fn) {
      return products.map(p => fn(Object.assign({}, p)));
    }
  }
}

function createProduct(data, requiredFields) {
  checkFields(data, requiredFields);
  return Object.assign({}, data);
}

function checkFields(data, requiredFields) {
  var givenFields = Object.keys(data);
  var missingFields = requiredFields.filter(field => {
    return !givenFields.includes(field) || data[field] == null;
  });

  if (missingFields.length) {
    throw new Error(`Product with id #{data.id} is missing required fields ${missingFields}`);
  }
}

}(typeof module !== 'undefined' ? module.exports : window));

