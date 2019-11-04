function codeToHtml(code, script) {
  let lines = getFunctionLines(code, script)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line instanceof jQuery) {
      $("#idContentEditable").append(line)
    } else {
      console.error(line)
    }
  }
  $("#idContentEditable").append($("<div contenteditable='true'>"))

}


function getFunctionLines(code, script) {
  let ast = jsparser(code);
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (isExportFun(element)) {
      return getLines(element.expression.right.body.body);
    }
  }
}

function getLines(body) {
  let lines = [];
  for (let i = 0; i < body.length; i++) {
    var element = body[i];
    var statementLines = write(element);
    lines = extendArray(statementLines, lines)
  }
  return lines;
}



function write(element) {
  let type = element.type;
  if (type === "ExpressionStatement") {
    var expressionLines = write(element.expression)
    return expressionLines;
  } else if (type === "VariableDeclaration") {
    throw new Error("todo")
    let init = element.declarations[0].init;
    // allowedInner(init);
    return {
      name: element.declarations[0].id.name,
      value: write(init)
    }
  } else if (type === "BinaryExpression") {
    var left = write(element.left)
    var right = write(element.right)
    return $('<a href="#" contenteditable="false">')
      .addClass("calc")
      .addClass("w3-tag w3-white w3-border-red w3-border w3-round")
      .text(left.text() + element.operator + right.text())
  } else if (type === "ConditionalExpression") {
    throw new Error("todo")
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
    return $("<div contenteditable='true'>")
      .append($("<span class='returns'>").text("return"))
      .append(expressions)
  } else if (type === "Literal") {
    return $("<span class='value'>").text(element.raw);
  } else if (type === "Identifier") {
    return $("<a class='ref' href='#'>").text(element.name) //link
  } else if (type === "CallExpression") {
    var callee = write(element.callee)
    return {
      name: callee.member + "()",
      arguments: element.arguments
    }
  } else if (type === "MemberExpression") {
    var object = write(element.object)
    return {
      object: object,
      member: element.property.name
    }
  } else if (type === "ObjectExpression") {
    var object = {}
    for (let i = 0; i < element.properties.length; i++) {
      const prop = element.properties[i];
      object[prop.key.value] = prop.value.value
    }
    var typ = findSynonymTypForFieldsSynonymOnObject(object)
    return getCreate(findSynonymForTyp(typ[0][0].from_typ)[0].name, object)
  } else if (type === "IfStatement") {
    throw new Error("if's are not allowed -> {}less")
  } else if (type === "FunctionExpression") {
    throw new Error("Functions are not allowed -> {}less")
  } else {
    console.log(element);
  }
}

function extendArray(object, array) {
  if (Array.isArray(object)) {
    array.concat(object)
  } else {
    array.push(object)
  }
  return array;
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


function getVars(type) {
  var vars = []
  for (let i = 0; i < scope.params.length; i++) {
    const param = scope.params[i];
    if (type != undefined || param.typ == type) {
      vars.push(findSynonymById(param.synonym)[0].name)
    }
  }
  return vars;
}