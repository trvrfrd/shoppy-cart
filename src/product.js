(function(exports) {

exports.createProduct = createProduct;

const REQUIRED_FIELDS = ['id', 'price', 'description', 'type'];

function createProduct(data) {
  checkFields(data);
  return Object.assign({}, data);
}

function checkFields(data, requiredFields = REQUIRED_FIELDS) {
  var givenFields = Object.keys(data);
  var missingFields = requiredFields.filter(field => !givenFields.includes(field));

  if (missingFields.length) {
    throw new Error(`Product with id #{data.id} is missing required fields ${missingFields}`);
  }
}

}(typeof module !== 'undefined' ? module.exports : window));

