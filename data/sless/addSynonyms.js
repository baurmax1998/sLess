
/**
  * extends posibilitys for autocomplete 
  * @param {posibility[]} posibilitys 
  * @returns {posibility[]}
*/ 
exports.fun = function addSynonyms(posibilitys) {
  for (let i = 0; i < scope.synonyms.length; i++) {
    const synonym = scope.synonyms[i];
    synonym.action = "create"
    synonym.info = "obj{}"
    posibilitys.push(synonym)
  }
  return posibilitys;
}
