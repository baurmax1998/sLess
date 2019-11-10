
/**
  * 
  * @param {number} param 
  * @param {number} returns 
  * @param {string} name 
  * @param {string} beschreibung 
  * @param {string} path 
  * @returns {fun}
*/ 
exports.fun = function createFun(param, returns, name, beschreibung, path) {
  return {
    param: param,
    returns: returns,
    name: name,
    beschreibung: beschreibung,
    path: path
  }
}
