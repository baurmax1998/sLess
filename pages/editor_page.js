let scope = {};

function initEditor(funName) {
  console.log(funName)
  $("#code_editor").show();

  var script = findFunByName(funName)[0]
  var params = findFieldsForTyp(script.param)
  let synonyms = getAllSynonyms()
  let funs = getAllFuns()
  scope.active = script;
  scope.params = params;
  scope.synonyms = synonyms;
  scope.funs = funs;

  let paramhtml = getScriptParams(findFieldsForTyp(script.param));


  $("#code_header").text("Code-Editor: " + funName + "()")
    .after(paramhtml)


  var tribute = new Tribute({
    allowSpaces: true,
    autocompleteMode: true,
    values: values,
    selectTemplate: selectTemplate,
    menuItemTemplate: menuItemTemplate,
    lookup: 'name',
    fillAttr: 'name'
  })

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

function activeRow() {
  return $("#idContentEditable > div:focus");
}

function menuItemTemplate(item) {
  return "<span class='left'>" + item.string + "</span>"
    + "<span class='right'>" + item.original.info + "</span>";
}


function selectTemplate(item) {
  let active = activeRow();
  if (typeof item === 'undefined') return null;
  if (item.original.action) {
    if (item.original.action == "var") {
      return selectVar(item, active)
    } else if (item.original.action == "create") {
      return selectCreate(item);
    } else if (item.original.action == "call") {
      return selectCall(item);
    }

  }
  return "todo"
}

function selectCall(item) {

  return $("<div>").append(
    $("<a href='#' class='' contenteditable='false'>").text(item.original.name)
  ).append(
    $("<a href='#' class='w3-tag w3-round-xxlarge w3-green' contenteditable='false'>").text(item.original.name)
      .append($('<i class="fa w3-small" style="padding-left: 3px;">').addClass("fa-external-link-alt"))
  ).html()
}

function selectCreate(item) {
  return $("<div>").append(
    $("<a href='#' class='w3-tag w3-round-xxlarge w3-green' contenteditable='false'>").text(item.original.name)
      .append($('<i class="fa w3-small" style="padding-left: 3px;">').addClass("fa-external-link-alt"))
  ).html()
}

function selectVar(item, active) {
  var textWithoutFunc = item.original.name.split(".")[0]
  let start = 3;
  let end = 4;
  if (item.original.info == "string") {
    textWithoutFunc = active.text().split(".")[0]
    textWithoutFunc = '"' + textWithoutFunc + '"'
    active.text("")
    start = 1;
    end = 2;
  }
  if (item.original.info == "any") {
    textWithoutFunc = active.html();
    textWithoutFunc = textWithoutFunc.split(".")[0];
    active.html("")
    start = 1;
    end = 2;
  }
  setTimeout(function () {
    var node = activeRow()[0];
    var range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }, 100);
  return "var <span class='varName'>name</span> = " + textWithoutFunc;
}

function values(text, cb) {
  var textWithoutFunc = text.split(".")[0]
  var posibilitys = [];
  posibilitys = addStandarts(posibilitys)
  posibilitys = addVars(posibilitys, textWithoutFunc);
  posibilitys = addSynonyms(posibilitys)
  posibilitys = addFuns(posibilitys)

  cb(posibilitys)
}

function addStandarts(posibilitys) {
  posibilitys = posibilitys.concat([{
    name: ".var",
    info: "any",
    action: "var"
  },{
    name: "return",
    info: "ret",
    action: "ret"
  }]);

  return posibilitys;
}

function addFuns(posibilitys) {
  for (let i = 0; i < scope.funs.length; i++) {
    const fun = scope.funs[i];
    fun.action = "call"
    fun.info = "fun()"
    posibilitys.push(fun)
  }
  return posibilitys;
}

function addSynonyms(posibilitys) {
  for (let i = 0; i < scope.synonyms.length; i++) {
    const synonym = scope.synonyms[i];
    synonym.action = "create"
    synonym.info = "obj{}"
    posibilitys.push(synonym)
  }
  return posibilitys;
}

function addVars(posibilitys, textWithoutFunc) {
  if (!activeRow().text().includes("var")) {
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




