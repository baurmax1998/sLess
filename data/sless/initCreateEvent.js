
/**
  * 
  */ 
exports.fun = function initCreateEvent() {
  $(".create").unbind( "click" ).on("click", function () {
    initObjectBuilder(this.text, scope, this)
  })
}
