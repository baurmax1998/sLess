
async function saveCanges() {
  var codeLines = htmlToCode($("#idContentEditable"))
  let newLines = jsparser(codeLines, { tolerant: true }).body

  let code = await readFile(scriptPathConfig + scope.active.path)
  let ast = jsparser(code, {
    attachComment: true
  });
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (isExportFun(element)) {
      ast.body[0].expression.right.body.body = newLines
    }
  }
  var newCode = escodegen.generate(ast, {
    format: {
      quotes: 'double',
      semicolons: false,
    },
    comment: true,
  })
  writeFile(scriptPathConfig + scope.active.path, newCode)
  console.log("Saved")
}

function isExportFun(element) {
  return element.type == "ExpressionStatement"
    && element.expression.type == "AssignmentExpression"
    && element.expression.left.type == "MemberExpression"
    && element.expression.left.object.name == "exports"
    && element.expression.left.property.name == "fun"

    && element.expression.right.type == "FunctionExpression"
    && element.expression.right.id.name == scope.active.name
}

function htmlToCode(elem) {
  var lines = elem.children()
  var codeLines = ""
  for (let i = 0; i < lines.length; i++) {
    let line = $(lines[i]);
    codeLines += htmlLineToCode(line) + "\n";
  }
  return codeLines;
}


function htmlLineToCode(lineElem) {
  var lineContent = lineElem.contents()
  var lineCode = ""
  for (let i = 0; i < lineContent.length; i++) {
    const elem = $(lineContent[i]);
    if (elem.hasClass("floatPoint")) {
      lineCode += "."
    }
    if (elem.hasClass("create")) {
      var json = JSON.stringify(elem.data().json)
      lineCode += "(" + json + ")"
    } else {
      lineCode += elem.text()
    }
  }
  return lineCode;
}