
/**
  * 
  * @param {$elem} lineElem 
  * @returns {string}
*/ 
exports.fun = function htmlLineToCode(lineElem) {
  var lineContent = lineElem.contents()
  var lineCode = ""
  for (let i = 0; i < lineContent.length; i++) {
    const elem = $(lineContent[i]);
    if (elem.hasClass("floatPoint")) {
      lineCode += "."
    }
    if (elem.hasClass("create")) {
      if (elem.text() == "()") {
        lineCode += "()"
      } else {
        var json = JSON.stringify(elem.data().json)
        lineCode += "_(" + json + ")"
      }
    } else {
      lineCode += elem.text()
    }
  }
  return lineCode;
}
