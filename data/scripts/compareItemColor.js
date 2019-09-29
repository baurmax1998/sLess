function compareItemTitle(a, b) {
  var aVal = a.getElement().getAttribute('data-title') || '';
  var bVal = b.getElement().getAttribute('data-title') || '';
  return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
}

function compareItemColor(a, b) {
  var aVal = a.getElement().getAttribute('data-color') || '';
  var bVal = b.getElement().getAttribute('data-color') || '';
  return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

}