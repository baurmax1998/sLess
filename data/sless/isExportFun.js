
/**
  * 
  * @param {ast_elem} element 
  * @returns {bool}
*/ 
exports.fun = function isExportFun(element) {
  return element.type == "ExpressionStatement"
    && element.expression.type == "AssignmentExpression"
    && element.expression.left.type == "MemberExpression"
    && element.expression.left.object.name == "exports"
    && element.expression.left.property.name == "fun"

    && element.expression.right.type == "FunctionExpression"
    && element.expression.right.id.name == scope.active.name
}
