exports.createStore = createStore;

var REQUIRED_FIELDS = ['id', 'type', 'price', 'description']

function createStore(inventory, requiredFields = REQUIRED_FIELDS) {
  inventory = inventory.map(product => _createProduct(product, requiredFields));

  return {
    getProduct(id) {
      return inventory.find(p => p.id === id);
    },

    map(fn) {
      return inventory.map(p => fn(Object.assign({}, p)));
    }
  }
}

function _createProduct(data, requiredFields) {
  _checkFields(data, requiredFields);
  return Object.assign({}, data);
}

function _checkFields(data, requiredFields) {
  var givenFields = Object.keys(data);
  var missingFields = requiredFields.filter(field => {
    return !givenFields.includes(field) || data[field] == null;
  });

  if (missingFields.length) {
    throw new Error(`Product with id #{data.id} is missing required fields ${missingFields}`);
  }
}

