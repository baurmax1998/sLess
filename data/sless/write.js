
/**
  * gives the HTML to the AST from JS
  * @param {object} element 
  * @returns {$elem[]}
*/ 
exports.fun = function write(element) {
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
    if (element.callee.type == "Identifier") {
      if(element.callee.name == "_"){
        return write(element.arguments[0])
      } else{
        console.log("todo: normal fun()")
      }
    } else {
      var callee = write(element.callee)
      // console.log("todo:" + element.arguments)
      var lines = []
      lines = extendArray(callee.object, lines)
      var call = $("<div contenteditable='true'>").html(getFloatCall(callee.member).html())
      lines = extendArray(call, lines)

      return lines
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
    return $("<div contenteditable='true'>")
      .append(
        getCreate(findSynonymForTyp(typ[0][0].from_typ)[0].name, object)
      );
  } else if (type === "IfStatement") {
    throw new Error("if's are not allowed -> {}less")
  } else if (type === "FunctionExpression") {
    throw new Error("Functions are not allowed -> {}less")
  } else {
    console.log(element);
  }
}
