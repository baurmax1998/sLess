
/**
  * addTypeWithName
  * @param {string} name 
  * @returns {number}
*/ 
exports.fun = function addTypeWithName(name) {
  var id = getId(tables.typ);
  add(tables.typ, typ(id))
  add(tables.synonym, synonym(id, name, getId(tables.synonym)))
  return id;
}
