
/**
  * 
  * @param {number} type 
  * @returns {synonym[]}
*/ 
exports.fun = function getVars(type) {
  var vars = []
  for (let i = 0; i < scope.params.length; i++) {
    const param = scope.params[i];
    if (type != undefined || param.typ == type) {
      vars.push(findSynonymById(param.synonym)[0].name)
    }
  }
  return vars;
}
