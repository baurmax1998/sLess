const fs = require("fs");
const parser = require("jsdoc3-parser");
let todos = [];
// const scriptPathConfig ="./data/scripts/"
const scriptPathConfig = "./data/todoapp/"


$(document).ready(async function () {
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();
  $("#type_builder").hide();
  $("#type_view").hide();
  $("#object_builder").hide();
  $("#fun_builder").hide();
  $("#calculator").hide();

  



  $("#code_editor").hide();
  addFunction("reloadf", "ORANGERED", "fa-sync");
  addFunction("addf", "YELLOWGREEN", "fa-plus");
  addFunction("editf", "DARKORCHID", "fa-edit");
  addFunction("searchf", "orange", "fa-search");
  addFunction("addTypef", "PLUM", "fa-dna");

  $("#searchf").on("click", function () {
    $("#main").show();
    $("#code_editor").hide();
  });

  $("#addTypef").on("click", function () {
    initFunBuilder()
  })

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
  // initCalc(["a", "b", "c", "aLongerOne", "zehn"])
  initTypeEditor()

})

function handleError(err) {
  if (err) return console.error(err);
}


