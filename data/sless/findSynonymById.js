
/**
  * 
  * @param {number} id 
  * @returns {synonym}
*/ 
exports.fun = function findSynonymById(id) {
  return db.get(tables.synonym)
    .filter({ id: id })
    .value();
}
