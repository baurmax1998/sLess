
/**
  * 
  * @param {object} object 
  * @returns {field[]}
*/ 
exports.fun = function findSynonymTypForFieldsSynonymOnObject(object) {
  var fields = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      var typ = findTypForSynonym(key)
      fields.push({
        synonym: typ.id
      })
    }
  }

  return findSynonymTypForFieldsSynonym(fields)
}
