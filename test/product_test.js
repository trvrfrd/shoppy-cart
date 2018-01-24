const assert = require('chai').assert;
const createProduct = require('../src/product').createProduct;
const fixtures = require('./fixtures.json')['chocolates'];
const fixtureData = () => Object.assign({}, fixtures[0]);

describe('Product', () => {
  it('can be created from a data object', () => {
    var data = fixtureData();
    var product = createProduct(data);
    assert.deepEqual(product, data);
  });

  it('creates a new copy of the passed data', () => {
    var data = fixtureData();
    var product = createProduct(data);
    data.id = 69;
    assert.notEqual(product.id, data.id);
  });

  it('can take an array of required fields and throws an error when passed non-conforming data', () => {
    var data = { id: 1 };
    var requiredFields = ['id', 'price', 'description', 'type'];
    assert.throws(() => createProduct(data, requiredFields), /price.+description.+type/);
  });

  it('throws if required fields are passed but with null or undefined data', () => {
    var data = { id: 1, description: null, price: undefined, type: undefined };
    var requiredFields = ['id', 'price', 'description', 'type'];
    assert.throws(() => createProduct(data, requiredFields), /price.+description.+type/);
  });
});

