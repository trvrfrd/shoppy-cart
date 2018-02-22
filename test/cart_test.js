const assert = require('chai').assert;
const createCart = require('../src/cart').createCart;

describe('Cart', () => {
  var cart;
  beforeEach(() => cart = createCart());

  it('does not add an item without an id', () => {
    var item = { price: 2.99 };

    assert.throws(() => cart.addItem(item), /id/i);
  });

  it('does not add an item without a price', () => {
    var item = { id: 3 };

    assert.throws(() => cart.addItem(item), /price/i);
  });

  it('adds an item', () => {
    var item = { id: 3, price: 2.99 };

    assert.doesNotThrow(() => cart.addItem(item));
  });

  it('can calculate the total price for the cart', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item2);

    var expected = (2 * item1.price) + item2.price;
    assert.equal(cart.getTotalPrice(), expected);
  });

  it('returns a total price of 0 for an empty cart', () => {
    assert.equal(cart.getTotalPrice(), 0);
  });

  it('can calculate the total quantity of items in the cart', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item2);

    assert.equal(cart.getTotalQuantity(), 3);
  });

  it('returns a total quantity of 0 for an empty cart', () => {
    assert.equal(cart.getTotalQuantity(), 0);
  });

  it('can update the quantity of a given item', () => {
    var item = { id: 3, price: 2.99 };
    cart.addItem(item);
    cart.updateQuantity(item.id, 5);

    assert.equal(cart.getTotalQuantity(), 5);
  });

  it('can remove an item', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item2);
    cart.removeItem(item1.id);

    var expected = item2.price;
    assert.equal(cart.getTotalPrice(), expected);
  });

  it('can empty cart', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item2);

    cart.empty();
    assert.equal(cart.getTotalPrice(), 0);
  });

  it('can map over items', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item2);

    var expected = [2.99, 5.99];
    var actual = cart.map(item => item.price);
    assert.deepEqual(actual, expected);
  });

  it('cannot mutate items when mapping over them', () => {
    var item1 = { id: 1, price: 2.99 };
    var item2 = { id: 2, price: 5.99 };
    cart.addItem(item1);
    cart.addItem(item2);

    cart.map(item => item.price = 0);
    assert.notEqual(cart.getTotalPrice(), 0);
  });
});

