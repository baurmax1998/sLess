
/**
  * extends posibilitys for autocomplete
  * @param {posibility[]} posibilitys 
  * @returns {posibility[]}
*/ 
exports.fun = function addMethods(posibilitys) {
  var active = activeRow()
  var lineElem = active.prev()
  var prevCode = htmlLineToCode(lineElem)
  if (prevCode == "") return posibilitys;
  if (prevCode.startsWith(".")) prevCode = prevCode.substring(1)
  var ast = jsparser(prevCode, { tolerant: true }).body[0]
  if (ast.typ == "VariableDeclaration") {
    var init = ast.declarations[0].init
  }
  if (ast.type == "ExpressionStatement") {
    var expression = ast.expression
    if (expression.type == "ObjectExpression") {
      var props = []
      for (let i = 0; i < expression.properties.length; i++) {
        const prop = expression.properties[i];
        props.push(prop.key.value)
      }
      var types = findTypesByFieldSynonyms(props)
      for (let i = 0; i < types.length; i++) {
        const typFields = types[i];
        var typ = typFields[0].from_typ
        posibilitiesForTyp(typ, posibilitys)
      }
    } else if (expression.type == "CallExpression") {
      var fun = findFunByName(expression.callee.name)
      var typ = fun.returns
      posibilitiesForTyp(typ, posibilitys)
    }
  }

  return posibilitys;
}
