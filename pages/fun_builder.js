var Sqrl = require("squirrelly");
var editor;

var funTemplate = `
/**
  * {{description}}

  {{each(options.params)}}
* @param {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
{{if(options.returns != undefined)}}
* @returns {{{returns}}{{if(options.array)}}[]{{/if}}}
{{/if}}
*/ 
exports.fun = function {{name}}({{each(options.params)}}
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
    var result = Sqrl.Render(funTemplate, newFun)
    addScript(newFun.name, result)
    $("#fun_builder").hide();
  })

  var typs = {
    id: "typ",
    type: "string",
    enum: [
      "object"
    ],
    default: "string"
  }

  var allSynonyms = getAllSynonyms();
  for (let i = 0; i < allSynonyms.length; i++) {
    const synonym = allSynonyms[i];
    typs.enum.push(synonym.name)
  }

  var config = {
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
        typ: typs,
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
  }


  editor = new JSONEditor(document.getElementById('fun_editor'), config);
}
