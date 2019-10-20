
var Sqrl = require("squirrelly");
var editor;

var typTemplate = `
/**
  * {{description}} 
  * @typedef {{{if(options.fields.length === 0)}}native{{#else}}object{{/if}}} {{name}}
  
  {{each(options.fields)}}
* @property {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
**/
`


function initTypeEditor() {
  $("#type_builder").show();
  var modal = document.getElementById('type_builder');
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  $("#createTyp").on("click", function () {
    var newType = editor.getValue()
    var result = Sqrl.Render(typTemplate, newType)
    addScript(newType.name, result)
    $("#type_builder").hide();
  })

  $("#type_editor").html("")

  editor = new JSONEditor(document.getElementById('type_editor'), {
    schema: {
      type: "object",
      title: "typ",
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string",
          format: "textarea"
        },
        fields: {
          type: "array",
          format: "tabs",
          items: {
            title: "Field",
            $ref: "#/definitions/field"
          }
        }
      },
      definitions: {
        typ: {
          id: "typ",
          type: "string",
          enum: [
            "string",
            "number",
            "bool",
            "object",
            "ToDo:ParamType"
          ],
          default: "String"
        },
        field: {
          type: "object",
          id: "field",
          defaultProperties: [
            "name",
            "description",
            "array",
            "typ"
          ],
          properties: {
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
            array: {
              type: "boolean",
              default: false
            },
            typ: {
              $ref: "#/definitions/typ",
              title: "typ"
            }
          }
        }
      }
    }
  });
  var newType = { "name": "asdf", "description": "asdfasdf", "fields": [] }
  editor.setValue(newType)
}