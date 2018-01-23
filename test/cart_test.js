const assert = require('chai').assert;
const createCart = require('../src/cart').createCart;

const mockItems = () => [
  {
    id: 0
  },
  {
    id: 1
  },
  {
    id: 2
  }
];

describe("Cart", () => {
  it("contains items", () => {
    var items = mockItems();
    var cart = createCart(items);
    assert.deepEqual(cart.getItem(0), { id: 0 });
  });

  it("adds items", () => {
    var cart = createCart();
    cart.addItem({ id: 3 });
    assert.deepEqual(cart.getItem(0), { id: 3 });
  });
});

