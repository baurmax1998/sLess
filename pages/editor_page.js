
function initEditor() {
  $("#code_editor").show();


  // example of alternative callback
  var tribute = new Tribute({
    // menuContainer: document.getElementById('content'),
    values: [
      { key: 'Jordan Humphreys', value: 'Jordan Humphreys', email: 'getstarted@zurb.com' },
      { key: 'Sir Walter Riley', value: 'Sir Walter Riley', email: 'getstarted+riley@zurb.com' }
    ],
    selectTemplate: function (item) {
      if (typeof item === 'undefined') return null;
      if (this.range.isContentEditable(this.current.element)) {
        return '<span contenteditable="false"><a href="http://zurb.com" target="_blank" title="' + item.original.email + '">' + item.original.value + '</a></span>';
      }

      return '@' + item.original.value;
    }
  });
  $("#idContentEditable > div").each((i, item) => {
    tribute.attach(item);
  })

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




