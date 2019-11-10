
/**
  * 
  * @param {number} type_id 
  * @returns {field[]}
*/ 
exports.fun = function findFieldsForTyp(type_id) {
  return db.get(tables.field)
    .filter({ from_typ: type_id })
    .value();
}
