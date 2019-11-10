
/**
  * todo returns an array of arrays of typ fields 
  * @param {number} typ_id 
  * @returns {field[]}
*/ 
exports.fun = function findSynonymTypForTyp(typ_id) {
  let fieldsForTyp = findFieldsForTyp(typ_id)
  return findSynonymTypForFields(fieldsForTyp, "");
}
