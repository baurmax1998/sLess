var Sqrl = require("squirrelly");
var editor;

var myTemplate = `
/**
  * {{description}}

  {{each(options.params)}}
* @param {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
* @returns {{{returns}}{{if(options.array)}}[]{{/if}}}
  */ 
function {{name}}({{each(options.params)}}
{{@this.name}}
{{if(@index + 1 < options.params.length)}}, {{/if}}
{{/each}}
) {
  
}
`

function initFunBuilder() {
  $("#fun_builder").show();
  var modal = document.getElementById('fun_builder');
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  $("#createFun").on("click", function () {
    var newFun = editor.getValue()
    var result = Sqrl.Render(myTemplate, newFun)
    addScript(newFun.name, result)
    $("#fun_builder").hide();
  })
  var newFun = {
    "name": "pow",
    "description": "The pow() function returns the base to the exponent power.",
    "params": [
      {
        "name": "base",
        "description": "lhjglj",
        "array": false,
        "typ": "number"
      },
      {
        "name": "exponent",
        "description": "bbjbhj",
        "array": false,
        "typ": "number"
      }
    ],
    "returns": "number",
    "array": false
  }

  editor = new JSONEditor(document.getElementById('fun_editor'), {
    schema: {
      type: "object",
      title: "fun",
      properties: {
        name: {
          type: "string"
        },
        description: {
          type: "string",
          format: "textarea"
        },
        params: {
          type: "array",
          format: "tabs",
          items: {
            title: "Param",
            $ref: "#/definitions/field"
          }
        },
        returns: {
          $ref: "#/definitions/typ"
        },
        array: {
          type: "boolean",
          title: "returns array",
          default: false
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
  editor.setValue(newFun)
}
