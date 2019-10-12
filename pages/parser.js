

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




