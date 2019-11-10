
/**
  * 
  */ 
exports.fun = function initCalcEvent() {
  $(".calc").unbind( "click" ).on("click", function () {
    console.log("hallo")
    var numberVars = getVars(0);
    initCalc($(this), numberVars)
  })
}
