const fs = require("fs");
const parser = require("jsdoc3-parser");
let todos = [];


$(document).ready(async function () {
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();
  $("#type_editor").hide();
  $("#object_builder").hide();
  $("#fun_builder").hide();

  $("#code_editor").hide();
  addFunction("searchf", "orange", "fa-search");
  addFunction("editf", "purple", "fa-edit");
  addFunction("addf", "green", "fa-plus");
  addFunction("reloadf", "red", "fa-sync");

  $("#editf").on("click", function () {
    $("#main").hide();
    $("#code_editor").show();
  });
  $("#searchf").on("click", function () {
    $("#main").show();
    $("#code_editor").hide();
  });

  $("#addf").on("click", function () {
      initFunBuilder()
  })

  $("#reloadf").on("click", function () {
    loadScripts()
  })

  // initScriptView();
  // initEditor("aaVerbrauch");
  // initQueryBuilder();
  // initObjectBuilder("number", {});
})

function handleError(err) {
  if (err) return console.error(err);
}


