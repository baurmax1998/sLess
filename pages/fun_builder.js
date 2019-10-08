

function initFunBuilder() {
  $("#fun_builder").show();

  var editor = new JSONEditor(document.getElementById('fun_editor'), {
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
            "String",
            "Number",
            "Bool",
            "Object",
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
              title: "Typ"
            }
          }

        }
      }
    }
  });
}
