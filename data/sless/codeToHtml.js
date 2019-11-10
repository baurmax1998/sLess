
/**
  * adds the code to the editor
  * @param {string} code 
  * @param {fun} script 
  */ 
exports.fun = function codeToHtml(code, script) {
  let lines = getFunctionLines(code, script)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line instanceof jQuery) {
      $("#idContentEditable").append(line)
    } else {
      console.error(line)
    }
  }
  $("#idContentEditable").append($("<div contenteditable='true'>"))
}
