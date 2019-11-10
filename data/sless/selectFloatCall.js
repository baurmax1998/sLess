
/**
  * 
  * @param {object} item 
  * @returns {string}
*/ 
exports.fun = function selectFloatCall(item) {
  return $("<div>").append(
    getFloatCall(item.original.name.substring(1)).children()
  ).html()
}
