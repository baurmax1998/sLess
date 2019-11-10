
/**
  * white list for elements that are allowed in sless
  * @param {ast_elem} element 
  * @returns {bool}
*/ 
exports.fun = function allowedInner(element) {
  if (!["BinaryExpression"
    , "ConditionalExpression"
    , "Literal"
    , "Identifier"
    , "CallExpression"
  ].includes(element.type))
    console.error(element);
}
