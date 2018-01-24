const assert = require('chai').assert;
const createCatalog = require('../src/catalog').createCatalog;
const fixtures = require('./fixtures.json')['chocolates'];
const fixtureData = () => fixtures.map(data => Object.assign({}, data));

describe('Catalog', () => {
  it('can be created from an Array of Objects', () => {
    assert.ok(createCatalog(fixtureData()));
  });

  it('can retrieve product data by product ID', () => {
    var products = fixtureData();
    var id = 2;
    var product = products.find(p => p.id === id);
    var catalog = createCatalog(products);

    assert.deepEqual(catalog.getProduct(id), product);
  });

  it('creates a new copy of product data', () => {
    var id = 2;
    var product = fixtureData().find(p => p.id === id);
    var catalog = createCatalog([product]);

    product.description = 'mutated!';
    assert.notEqual(catalog.getProduct(id).description, product.description);
  });

  it('can take an array of required fields and throws an error when passed an invalid product', () => {
    var products = [{ id: 1 }];
    var requiredFields = ['id', 'price', 'description', 'type'];

    assert.throws(() => createCatalog(products, requiredFields), /price.+description.+type/);
  });

  it('throws if product with required fields is passed but with null or undefined data', () => {
    var products = [{ id: 1, description: null, price: undefined, type: undefined }];
    var requiredFields = ['id', 'price', 'description', 'type'];
    assert.throws(() => createCatalog(products, requiredFields), /price.+description.+type/);
  });

  it('can map over all of its products', () => {
    var products = fixtureData();
    var catalog = createCatalog(products);

    var descriptions = catalog.map(product => product.description);
    assert.deepEqual(descriptions, products.map(p => p.description));
  });
});

