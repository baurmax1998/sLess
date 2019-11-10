
/**
  * 
  * @param {string} synonym 
  * @returns {synonym}
*/ 
exports.fun = function findTypForSynonymOrCreate(synonym) {
  var synonymObject = findTypForSynonym(synonym);
  if (synonymObject == undefined) {
    addTypeWithName(synonym)
  }
  return findTypForSynonym(synonym)
}
