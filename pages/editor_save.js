
async function saveCanges() {
  var lines = $("#idContentEditable").children()

  var codeLines = ""
  for (let i = 0; i < lines.length; i++) {
    let line = $(lines[i]);
    let childs = line.children();
    let codeLine = ""
    for (let x = 0; x < childs.length; x++) {
      const child = $(childs[x]);
      codeLine += " " + child.text()
    }
    codeLines += codeLine + "\n";
  }
  let newLines = jsparser(codeLines,{ tolerant: true }).body
  
  let code = await readFile(scriptPathConfig + scope.active.path)
  let ast = jsparser(code, {
    attachComment: true
  });
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (element.type === "FunctionDeclaration" && element.id.name === scope.active.name) {
      ast.body[i].body.body = newLines;
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