
/**
  * addOrGetSynonym
  * @param {number} typ 
  * @param {string} name 
  * @returns {number}
*/ 
exports.fun = function addOrGetSynonym(typ, name) {
  let currentSynonym = db.get(tables.synonym)
    .filter({
      typ: typ,
      name: name
    }).value();
  let id = getId(tables.synonym);
  if (currentSynonym.length == 0) {
    add(tables.synonym, synonym(typ, name, id))
  } else {
    id = currentSynonym[0].id;
  }
  return id;
}
