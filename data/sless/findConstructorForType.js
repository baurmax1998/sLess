
/**
  * returns the typ
  * @param {number} type_id 
  * @returns {fun[]}
*/ 
exports.fun = function findConstructorForType(type_id) {
  let synonym_typs = findSynonymTypForTyp(type_id)
  let allFunktions = getAll(tables.fun);
  return Stream(allFunktions).filter(function (fun) {
    return synonym_typs.includes(fun.returns);
  })
}
