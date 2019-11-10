
/**
  * 
  * @param {string} params 
  * @returns {field[]}
*/ 
exports.fun = function findTypesByFieldSynonyms(params) {
  var fields = []
  for (let i = 0; i < params.length; i++) {
    const syno = params[i];
    var typ = findTypForSynonym(syno)
    typ["synonym"] = typ.id
    fields.push(typ)
  }
  var types = findSynonymTypForFieldsSynonym(fields)
  return types;
}
