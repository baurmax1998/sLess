
/**
  * 
  * @param {string} funName 
  */ 
exports.fun = async function initEditor(funName) {
  console.log(funName)
  $("#code_editor").show();
  var script = findFunByName(funName)
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
