function initObjectBuilder(typeSyn, scope) {
  $("#object_builder").show();
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


let properties = {
  make: {
    type: "string",
    enum: [
      "Toyota",
      "BMW",
      "Honda",
      "Ford",
      "Chevy",
      "VW"
    ]
  },
  model: {
    type: "string"
  },
  year: {
    type: "integer",
    enum: [
      1995,1996,1997,1998,1999,
      2000,2001,2002,2003,2004,
      2005,2006,2007,2008,2009,
      2010,2011,2012,2013,2014
    ],
    default: 2008
  },
  safety: {
    type: "integer",
    format: "rating",
    maximum: "5",
    exclusiveMaximum: false,
    readonly: false
  }
};