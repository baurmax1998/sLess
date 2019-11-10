
/**
  * 
  * @param {object} item 
  * @returns {string}
*/ 
exports.fun = function menuItemTemplate(item) {
  return "<span class='left'>" + item.string + "</span>"
  + "<span class='right'>" + item.original.info + "</span>";
}
