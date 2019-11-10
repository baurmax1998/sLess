
/**
  * 
  * @param {object} item 
  * @returns {string}
*/ 
exports.fun = function selectCreate(item) {
  setTimeout(initCreateEvent, 100);
  return $("<div>").append(getCreate(item.original.name, {})).html()
}
