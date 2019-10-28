function initObjectBuilder(typeSyn, scope) {
  $("#object_builder").show();
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
    "1": "string"
  }

  if(fields.length == 0){
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

  // $("#object_builder")
  // $("#json_editor")

   // Initialize the editor with a JSON schema
   var editor = new JSONEditor(document.getElementById('json_editor'),{
    schema: {
      type: "object",
      title: typeSyn,
      properties: properties
    }
  });
}