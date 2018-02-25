const assert = require('chai').assert;
const createStore = require('../src/store').createStore;
const fixtures = require('./fixtures.json')['chocolates'];
const fixtureData = () => fixtures.map(data => Object.assign({}, data));

describe('Store', () => {
  it('can be created from an Array of Objects', () => {
    assert.ok(createStore(fixtureData()));
  });

  it('can retrieve product data by product ID', () => {
    var products = fixtureData();
    var id = 2;
    var product = products.find(p => p.id === id);
    var store = createStore(products);

    assert.deepEqual(store.getProduct(id), product);
  });

  it('creates a new copy of product data', () => {
    var id = 2;
    var product = fixtureData().find(p => p.id === id);
    var store = createStore([product]);

    product.description = 'mutated!';
    assert.notEqual(store.getProduct(id).description, product.description);
  });

  it('can take an array of required fields and throws an error when passed an invalid product', () => {
    var products = [{ id: 1 }];
    var requiredFields = ['id', 'price', 'description', 'type'];

    assert.throws(() => createStore(products, requiredFields), /price.+description.+type/);
  });

  it('throws if product with required fields is passed but with null or undefined data', () => {
    var products = [{ id: 1, description: null, price: undefined, type: undefined }];
    var requiredFields = ['id', 'price', 'description', 'type'];
    assert.throws(() => createStore(products, requiredFields), /price.+description.+type/);
  });

  it('can map over all of its products', () => {
    var products = fixtureData();
    var store = createStore(products);

    var descriptions = store.map(product => product.description);
    assert.deepEqual(descriptions, products.map(p => p.description));
  });

  it('cannot mutate products when mapping over them', () => {
    var products = fixtureData();
    var store = createStore(products);
    var id = 2;
    var product = store.getProduct(id);

    store.map(product => product.description = 'mutated!');
    var actual = store.getProduct(id).description;
    assert.notEqual(actual, 'mutated!');
  });
});

