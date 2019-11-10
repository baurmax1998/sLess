
/**
  * get all Elements from table
  * @param {string} tableName 
  * @returns {object[]}
*/ 
exports.fun = function getAll(tableName) {
  return db.get(tableName).value();

}
