
/**
  * 
  * @param {string} tableName 
  * @returns {number}
*/ 
exports.fun = function getId(tableName) {
  return db.get(tableName).size().value()
}
