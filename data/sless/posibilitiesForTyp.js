
/**
  * extends posibilitys for autocomplete 
  * @param {number} typ 
  * @param {posibility[]} posibilitys 
  * @returns {posibility[]}
*/ 
exports.fun = function posibilitiesForTyp(typ, posibilitys) {
  var methods = findMethodsForType(typ)
  for (let j = 0; j < methods.length; j++) {
    const method = methods[j];
    posibilitys.push({
      name: "." + method.name,
      info: ".call",
      action: ".call"
    })
  }
  var typFields = findFieldsForTyp(typ)
  for (let j = 0; j < typFields.length; j++) {
    const field = typFields[j];
    var fieldSynonym = findSynonymById(field.synonym)[0]
    posibilitys.push({
      name: "." + fieldSynonym.name,
      info: ".get",
      action: ".get"
    })
  }
}
