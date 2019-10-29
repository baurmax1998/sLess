function initObjectBuilder(typeSyn, scope, elem) {
  $("#object_builder").show();
  $("#json_editor").html("");
  var modal = document.getElementById('object_builder');
  window.onclick = function (event) {
    if (event.target == modal) {
      $("#object_builder").hide()
    }
  }

  let typ = findTypForSynonym(typeSyn)[0];
  let fields = findFieldsForTyp(typ.typ)
  let properties = {};
  const primitives = {
    "0": "integer",
    "1": "string",
    "2": "boolean"
  }

  if (fields.length == 0) {
    fields.push({
      synonym: typ.id,
      typ: typ.typ
    })
  }

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const name = findSynonymById(field.synonym)[0].name

    properties[name] = {
      type: primitives[field.typ]
    }
  }


  // Initialize the editor with a JSON schema
  let editor = new JSONEditor(document.getElementById('json_editor'), {
    schema: {
      type: "object",
      title: typeSyn,
      properties: properties
    }
  });

  let currentObj = $(elem).attr("data-json");
  if (currentObj != undefined)
    editor.setValue(JSON.parse(currentObj))

  $("#saveObject").on("click", function () {
    var obj = editor.getValue()
    $(elem).attr("data-json", JSON.stringify(obj))
    $("#object_builder").hide()
  })
}