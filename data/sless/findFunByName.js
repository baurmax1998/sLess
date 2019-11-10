
/**
  * 
  * @param {string} name 
  * @returns {fun}
*/ 
exports.fun = function findFunByName(name) {
  return db.get(tables.fun)
    .filter({ name: name })
    .value()[0];
}
