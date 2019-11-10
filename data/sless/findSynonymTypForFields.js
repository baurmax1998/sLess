
/**
  * 
  * @param {field} fields 
  * @param {string} attr 
  * @returns {field[]}
*/ 
exports.fun = function findSynonymTypForFields(fields, attr) {
  let attrFromFields = Stream(fields)
    .map(attr)
    .toArray();
  let types = Stream(getAll(tables.field))
    .groupBy('from_typ');
  let synonym_typs = [];
  for (const typ in types) {
    const fields = types[typ];
    let wrongField = false;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      wrongField = !attrFromFields.includes(field[attr]) || wrongField;
    }
    if (!wrongField) {
      synonym_typs.push(fields)
    }
  }
  return synonym_typs;
}
