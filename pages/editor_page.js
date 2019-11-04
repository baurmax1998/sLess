let scope = {};
let jsparser = esprima.parse;


async function initEditor(funName) {
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

  $("#editf").on("click", saveCanges);

  let code = await readFile(scriptPathConfig + script.path)

  codeToHtml(code, script)
  initCalcEvent()
  initCreateEvent()

  var tribute = new Tribute({
    allowSpaces: false,
    autocompleteMode: true,
    values: values,
    selectTemplate: selectTemplate,
    menuItemTemplate: menuItemTemplate,
    lookup: 'name',
    fillAttr: 'name'
  })
  makeEditable(tribute)
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
    } else if (item.original.action == "key") {
      return item.original.name;
    } else if (item.original.action == "calc") {
      return selectMath()
    } else if (item.original.action == ".call") {
      return selectFloatCall(item)
    }
    console.log(item)
  }
  return "todo"
}

function selectFloatCall(item) {
  return $("<div>")
    .append(
      $('<i class="fa w3-small" style="padding-right: 3px;">')
        .addClass("fa-arrow-circle-right")
        .addClass("floatPoint")
    ).append(
      $('<a href="#" contenteditable="false">')
        .addClass("method")
        .text(item.original.name.substring(1))
    ).append(
      $("<a href='#' class='w3-tag w3-round-xxlarge w3-green create' contenteditable='false'>").text("()")
    ).html()
}


function selectMath() {
  setTimeout(initCalcEvent, 100);
  return $("<div>").append(
    $('<a href="#" contenteditable="false">')
      .addClass("calc")
      .addClass("w3-tag w3-white w3-border-red w3-border w3-round")
      .text("0")
  ).html()
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
  setTimeout(initCreateEvent, 100);
  return getCreate(item.original.name, {})
}

function getCreate(typ, value) {
  return $("<div>").append(
    $("<a href='#' class='w3-tag w3-round-xxlarge w3-green create' contenteditable='false'>")
      .attr("data-json", JSON.stringify(value))
      .text(typ)
      .append($('<i class="fa w3-small" style="padding-left: 3px;">')
        .addClass("fa-external-link-alt"))
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
  posibilitys = addMethods(posibilitys, textWithoutFunc)
  posibilitys = addSynonyms(posibilitys)
  posibilitys = addStandarts(posibilitys)
  posibilitys = addVars(posibilitys, textWithoutFunc);
  posibilitys = addFuns(posibilitys)
  cb(posibilitys)
}

function addMethods(posibilitys, textWithoutFunc) {
  var active = activeRow()
  var lineElem = active.prev()
  var prevCode = htmlLineToCode(lineElem)
  if (prevCode == "") return posibilitys;
  if (prevCode.startsWith(".")) prevCode = prevCode.substring(1)
  var ast = jsparser(prevCode, { tolerant: true }).body[0]
  if (ast.typ == "VariableDeclaration") {
    var init = ast.declarations[0].init
  }
  if (ast.type == "ExpressionStatement") {
    var expression = ast.expression
    if (expression.type == "ObjectExpression") {
      var props = []
      for (let i = 0; i < expression.properties.length; i++) {
        const prop = expression.properties[i];
        props.push(prop.key.value)
      }
      var types = findTypesByFieldSynonyms(props)
      for (let i = 0; i < types.length; i++) {
        const typFields = types[i];
        var typ = typFields[0].from_typ
        posibilitiesForTyp(typ, posibilitys)
      }
    } else if (expression.type == "CallExpression") {
      var fun = findFunByName(expression.callee.name)[0]
      var typ = fun.returns
      posibilitiesForTyp(typ, posibilitys)
    }
  }

  return posibilitys;
}



function posibilitiesForTyp(typ, posibilitys) {
  var methods = findMethodsForType(typ)
  for (let j = 0; j < methods.length; j++) {
    const method = methods[j];
    posibilitys.push({
      name: "." + method.name,
      info: ".call",
      action: ".call"
    })
  }
  var typFields = findFieldsForTyp(typ)
  for (let j = 0; j < typFields.length; j++) {
    const field = typFields[j];
    var fieldSynonym = findSynonymById(field.synonym)[0]
    posibilitys.push({
      name: "." + fieldSynonym.name,
      info: ".get",
      action: ".get"
    })
  }
}

function addStandarts(posibilitys) {
  posibilitys = posibilitys.concat([{
    name: ".var",
    info: "any",
    action: "var"
  }, {
    name: "return",
    info: "key",
    action: "key"
  }, {
    name: ".calc",
    info: "math",
    action: "calc"
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