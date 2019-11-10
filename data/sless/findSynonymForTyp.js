
/**
  * 
  * @param {number} type_id 
  * @returns {synonym}
*/ 
exports.fun = function findSynonymForTyp(type_id) {
  return db.get(tables.synonym)
  .filter({ typ: type_id })
  .value();
}
