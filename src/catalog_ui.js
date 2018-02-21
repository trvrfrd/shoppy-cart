(function(exports) {

exports.renderCatalog = renderCatalog;

function renderCatalog(rootNode, catalog) {
  var div = document.createElement('div');
  div.textContent = 'rendered catalog!';
  rootNode.appendChild(div);
}

}(typeof module !== 'undefined' ? module.exports : window));
