
/**
  * funs with typ as param
  * @param {number} type_id 
  * @returns {fun[]}
*/ 
exports.fun = function findMethodsForType(type_id) {
  return Stream(getAll(tables.fun)).filter(function (fun) {
    var fields = Stream(findFieldsForTyp(fun.param))
      .map("typ")
      .toArray();
    fields.push(fun.param)
    return fields.includes(type_id)
  }).toArray()
}
