(function(exports) {

exports.createProduct = createProduct;

function createProduct(data, requiredFields) {
  if (requiredFields) checkFields(data, requiredFields);
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

