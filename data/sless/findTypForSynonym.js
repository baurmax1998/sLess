
/**
  * 
  * @param {string} synonym 
  * @returns {synonym}
*/ 
exports.fun = function findTypForSynonym(synonym) {
  var isArray = synonym.match(/Array.<.*>/)
  if (isArray) {
    synonym = synonym.match(/<(.*?)>/)[1]
  }
  var synonym = db.get(tables.synonym)
  .filter({ name: synonym })
  .value()[0]
  if (isArray) {
    synonym.typ = synonym.typ * -1
  }
  return synonym;
}
