
/**
  * saveCanges from editor
  */ 
exports.fun = async function saveCanges() {
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
