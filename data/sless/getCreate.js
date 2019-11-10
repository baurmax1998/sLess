
/**
  * 
  * @param {string} typ 
  * @param {object} value 
  * @returns {$elem}
*/ 
exports.fun = function getCreate(typ, value) {
  return $("<a href='#' class='w3-tag w3-round-xxlarge w3-green create' contenteditable='false'>")
      .attr("data-json", JSON.stringify(value))
      .text(typ)
      .append($('<i class="fa w3-small" style="padding-left: 3px;">')
        .addClass("fa-external-link-alt"))
}
