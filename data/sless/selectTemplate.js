
/**
  * 
  * @param {object} item 
  * @returns {string}
*/ 
exports.fun = function selectTemplate(item) {
  let active = activeRow();
  if (typeof item === 'undefined') return null;
  if (item.original.action) {
    if (item.original.action == "var") {
      return selectVar(item, active)
    } else if (item.original.action == "create") {
      return selectCreate(item);
    } else if (item.original.action == "call") {
      return selectCall(item);
    } else if (item.original.action == "key") {
      return item.original.name;
    } else if (item.original.action == "calc") {
      return selectMath()
    } else if (item.original.action == ".call") {
      return selectFloatCall(item)
    }
    console.log(item)
  }
  return "todo"
}
