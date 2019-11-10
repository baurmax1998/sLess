
/**
  * 
  * @returns {string}
*/ 
exports.fun = function selectMath() {
  setTimeout(initCalcEvent, 100);
  return $("<div>").append(
    $('<a href="#" contenteditable="false">')
      .addClass("calc")
      .addClass("w3-tag w3-white w3-border-red w3-border w3-round")
      .text("0")
  ).html()
}
