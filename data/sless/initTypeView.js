
/**
  * 
  */ 
exports.fun = function initTypeView() {
  $("#type_view").show();
  $("#typTable").html("");
  var allSynonyms = getAllSynonyms();
  for (let i = 0; i < allSynonyms.length; i++) {
    const synonym = allSynonyms[i];
    var row = $("<tr>").append($("<td>").text(synonym.name));
    var fields = findFieldsForTyp(synonym.typ)
    var content = $("<td>");
    if (fields.length == 0) {
      var first = findSynonymForTyp(synonym.typ)[0];
      if (first.name == synonym.name) {
        content.text("native")
      } else {
        content.text(first.name)
      }
    } else {
      for (let x = 0; x < fields.length; x++) {
        const field = fields[x];
        var fieldName = findSynonymById(field.synonym)[0].name
        content.append(
          $('<a href="#" class="w3-tag w3-round-xxlarge w3-green" contenteditable="false">')
            .text(fieldName))
      }
    }
    row.append(content)
    $("#typTable").append(row);
  }
}
