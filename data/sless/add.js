
/**
  * add object to db
  * @param {string} tableName 
  * @param {object} object 
  */ 
exports.fun = function add(tableName, object) {
  db.get(tableName)
    .push(object)
    .write()
}
