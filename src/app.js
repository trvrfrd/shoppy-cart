fetch('data/inventory.json')
  .then(response => response.json())
  .then(function(inventory) {
    var store = createStore(inventory.cakes);
    renderStore(document.querySelector('article.catalog'), store);
  });

var cart = createCart();
cartUI.init(cart, {
  itemsContainer: document.querySelector('.modal-cart-items'),
  countContainer: document.querySelector('.sidebar .cart-count'),
  clearButton: document.querySelector('.clear-cart')
});

var pageContainer = document.querySelector('.page-container');
var modal = document.getElementById('modal');

function openModal() {
  modal.classList.add('open');
  pageContainer.classList.add('modal-open');
}

document.querySelector('.sticky-cart button').addEventListener('click', openModal);

function closeModal() {
  modal.classList.remove('open');
  pageContainer.classList.remove('modal-open');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

// escape key exits modal!
document.body.addEventListener('keydown', function(e) {
  if (e.keyCode === 27) closeModal();
});
