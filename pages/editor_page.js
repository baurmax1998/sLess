
function initEditor(funName) {
  console.log(funName)
  $("#code_editor").show();

  var autocomplete = initAutocomplete(funName);

  var tributeNoMatch = new Tribute({
    allowSpaces: true,
    autocompleteMode: true,
    values: autocomplete,
    selectTemplate: function (item) {
      if (typeof item === 'undefined') return null;
      setTimeout(function () {
        var node = activeRow()[0];
        var range = document.createRange();
        range.setStart(node, 3);
        range.setEnd(node, 4);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }, 100);
      return "var <span>name</span> = 'max'";
    },
    menuItemTemplate: function (item) {
      return "<span class='left'>" + item.string + "</span>"
        + "<span class='right'>" + item.original.info + "</span>";
    },
    lookup: 'name',
    fillAttr: 'name'
  })


  $("#idContentEditable > div").each((i, item) => {
    // tributeAutocompleteTest.attach(item);
    // tributeMultipleTriggers.attach(item);
    tributeNoMatch.attach(item);
  })
}

function initAutocomplete(params) {
  return function (text, cb) {
    var textWithoutFunc = text.split(".")[0]
    var posibilitys = [];
    posibilitys = addVars(posibilitys, textWithoutFunc);
    cb(posibilitys)
  }

  function addVars(posibilitys, textWithoutFunc) {
    if(!activeRow().text().includes("var")){
      posibilitys = posibilitys.concat([{
        name: "true.var",
        info: "bool",
        action: "var"
      }, {
        name: "false.var",
        info: "bool",
        action: "var"
      }, {
        name: textWithoutFunc + ".var",
        info: "string",
        action: "var"
      }]);
      if (!isNaN(textWithoutFunc)) {
        posibilitys.push({
          name: textWithoutFunc + ".var",
          info: "number",
          action: "var"
        })
      }
    } 
    return posibilitys;
  }
}

function activeRow() {
  return $("#idContentEditable > div:focus");
}


function tempInit() {
  $("#idContentEditable > div").keydown(function editorKeydown(e) {
    let target = $(e.target);
    if (e.which == 13 && !$(".tribute-container").is(":visible")) {
      var newRow = $("<div contenteditable='true'>");
      tribute.attach(newRow);
      newRow
        .keydown(editorKeydown)
        .insertAfter(target)
      target.next().focus();
      return false;
    }

    if (e.keyCode == 8 && e.target.textContent == "" && $("#idContentEditable").children().length > 1) {
      var prev = target.prev()
      target.remove();
      prev.focus().delay(20).caretToEnd();

    }
    return true;
  })
}

function getTwo() {
  return "Two";
}

function square(a, b) {
  notNull(a);
  notNull(b);
  let result = a * b;
  let one = "One";
  return result === 0 ? "Zero" :
    result === 1 ? one :
      result === 2 ? getTwo() :
        result + "th";
}

function parseTest() {
  let parser = esprima.parse;
  let ast = parser(square.toString());
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (element.type === "FunctionDeclaration" && element.id.name === "square") {
      getLines(element.body.body)
    }
  }
}

function getLines(body) {
  let lines = [];
  for (let i = 0; i < body.length; i++) {
    var element = body[i];
    var statementLines = write(element);
    if (Array.isArray(statementLines)) {
      lines.concat(statementLines)
    } else {
      lines.push(statementLines)
    }
  }
  console.log(lines);
}

function allowedInner(element) {
  if (!["BinaryExpression"
    , "ConditionalExpression"
    , "Literal"
    , "Identifier"
    , "CallExpression"
  ].includes(element.type))
    console.error(element);
}

function write(element) {
  let type = element.type;
  if (type === "ExpressionStatement") {
    return {
      name: element.expression.callee.name + "()",
      arguments: element.expression.arguments
    }
  } else if (type === "VariableDeclaration") {
    let init = element.declarations[0].init;
    // allowedInner(init);
    return {
      name: element.declarations[0].id.name,
      value: write(init)
    }
  } else if (type === "BinaryExpression") {
    return {
      operator: element.operator
    }
  } else if (type === "ConditionalExpression") {
    let consequent = element.consequent;
    let alternate = element.alternate;
    allowedInner(consequent);
    allowedInner(alternate);
    return {
      conditon: write(element.test),
      consequent: write(consequent),
      alternate: write(alternate)
    }

  } else if (type === "ReturnStatement") {
    let expressions = write(element.argument);
    console.log("return");
    return expressions;
  } else if (type === "Literal") {
    return element.raw;
  } else if (type === "Identifier") {
    return element.name; //link
  } else if (type === "CallExpression") {
    return {
      name: element.callee.name + "()",
      arguments: element.arguments
    }
  } else if (type === "IfStatement") {
    throw new Error("if's are not allowed -> {}less")
  } else if (type === "FunctionExpression") {
    throw new Error("Functions are not allowed -> {}less")
  } else {
    console.log(element);
  }
}




