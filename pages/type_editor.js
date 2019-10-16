
var Sqrl = require("squirrelly");
var editor;

var myTemplate = `
/**
  * {{description}}

  {{each(options.params)}}
* @param {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
{{if(options.returns != undefined)}}
* @returns {{{returns}}{{if(options.array)}}[]{{/if}}}
{{/if}}
*/ 
function {{name}}({{each(options.params)}}
{{@this.name}}
{{if(@index + 1 < options.params.length)}}, {{/if}}
{{/each}}
) {
  
}
`



function initTypeEditor() {
  $("#type_builder").show();
  var modal = document.getElementById('type_builder');
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  $("#createFun").on("click", function () {
    var newType = editor.getValue()
    var result = Sqrl.Render(myTemplate, newType)
    console.log("todo")
    $("#type_builder").hide();
  })

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
  // editor.setValue(newFun)
}