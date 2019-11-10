
/**
  * get all lines for the editor out of a body element of the ast
  * @param {ast_elem[]} body 
  * @returns {$elem[]}
*/ 
exports.fun = function getLines(body) {
  let lines = [];
  for (let i = 0; i < body.length; i++) {
    var element = body[i];
    var statementLines = write(element);
    lines = extendArray(statementLines, lines)
  }
  return lines;
}
