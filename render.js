const fs = require("fs");
const parser = require("jsdoc3-parser");
let todos = [];
// const scriptPathConfig ="./data/scripts/"
const scriptPathConfig = "./data/express/"

function hideAll() {
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();
  $("#type_builder").hide();
  $("#type_view").hide();
  $("#object_builder").hide();
  $("#fun_builder").hide();
  $("#calculator").hide();
}


$(document).ready(async function () {
  
  hideAll()


  $("#code_editor").hide();
  addFunction("reloadf", "ORANGERED", "fa-sync");
  addFunction("addf", "YELLOWGREEN", "fa-plus");
  addFunction("editf", "DARKORCHID", "fa-edit");
  addFunction("searchf", "orange", "fa-search");
  addFunction("addTypef", "PLUM", "fa-dna");
  addFunction("viewTypef", "PLUM", "fa-tasks");


  $("#searchf").on("click", function () {  
    hideAll()
    $("#main").show();
  });

  $("#viewTypef").on("click", function () {
    hideAll()
    initTypeView()
  })

  $("#addTypef").on("click", function () {
    hideAll()
    initTypeEditor()
  })

  $("#addf").on("click", function () {
    hideAll()
    initFunBuilder()
  })

  $("#reloadf").on("click", function () {
    hideAll()
    loadScripts()
  })

  // initScriptView();
  initEditor("main");
  // initQueryBuilder();
  // initObjectBuilder("number", {});
  // initCalc(["a", "b", "c", "aLongerOne", "zehn"])
  // initTypeEditor()
  // initTypeView()


})

function handleError(err) {
  if (err) return console.error(err);
}


