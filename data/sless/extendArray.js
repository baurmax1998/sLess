
/**
  * extends the array with one object or a list of objects
  * @param {object} object can be an object or an array
  * @param {object[]} array 
  * @returns {object[]}
*/ 
exports.fun = function extendArray(object, array) {
  if (Array.isArray(object)) {
    array = array.concat(object)
  } else {
    array.push(object)
  }
  return array;
}
