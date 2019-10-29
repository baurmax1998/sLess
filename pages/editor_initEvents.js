
function initCreateEvent() {
  $(".create").unbind( "click" ).on("click", function () {
    initObjectBuilder(this.text, scope, this)
  })
}

function initCalcEvent(){
  $(".calc").unbind( "click" ).on("click", function () {
    console.log("hallo")
    var numberVars = getVars(0);
    initCalc($(this), numberVars)
  })
}