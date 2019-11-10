
/**
  * 
  * @param {string} name 
  * @returns {$elem}
*/ 
exports.fun = function getFloatCall(name) {
  return $("<span contenteditable='false'>")
    .append(
      $('<i class="fa w3-small" style="padding-right: 3px;">')
        .addClass("fa-arrow-circle-right")
        .addClass("floatPoint")
    ).append(
      $('<a href="#" contenteditable="false">')
        .addClass("method")
        .text(name)
    ).append(
      $("<a href='#' class='w3-tag w3-round-xxlarge w3-green create' contenteditable='false'>")
        .text("()")
    );
}
