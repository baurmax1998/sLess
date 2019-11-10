
/**
  * 
  * @param {string} code 
  * @param {fun} script 
  * @returns {$elem[]}
*/ 
exports.fun = function getFunctionLines(code, script) {
  let ast = jsparser(code);
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (isExportFun(element)) {
      return getLines(element.expression.right.body.body);
    }
  }
}
