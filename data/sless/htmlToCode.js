
/**
  * 
  * @param {$elem} elem 
  * @returns {string}
*/ 
exports.fun = function htmlToCode(elem) {
  var lines = elem.children()
  var codeLines = ""
  for (let i = 0; i < lines.length; i++) {
    let line = $(lines[i]);
    codeLines += htmlLineToCode(line) + "\n";
  }
  return codeLines;
}
