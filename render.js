const fs = require("fs");
const parser = require("jsdoc3-parser");
let todos = [];
// const scriptPathConfig ="./data/scripts/"
const scriptPathConfig = "./data/sless/"

var Sqrl = require("squirrelly");
var editor;

let scope = {};
let jsparser = esprima.parse;

var typTemplate = `
/**
  * {{description}} 
  * @typedef {{{if(options.fields.length === 0)}}native{{#else}}object{{/if}}} {{name}}
  
  {{each(options.fields)}}
* @property {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
**/
`

var funTemplate = `
/**
  * {{description}}

  {{each(options.params)}}
* @param {{{@this.typ}}{{if(@this.array)}}[]{{/if}}} {{@this.name}} {{@this.description}}

  {{/each}}
{{if(options.returns != undefined)}}
* @returns {{{returns}}{{if(options.array)}}[]{{/if}}}
{{/if}}
*/ 
exports.fun = function {{name}}({{each(options.params)}}
{{@this.name}}
{{if(@index + 1 < options.params.length)}}, {{/if}}
{{/each}}
) {
  
}
`

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let db = low(new FileSync('db.json'))
db.defaults({
  typ: [],
  synonym: [],
  synonym_typ: [],
  field: [],
  fun: [],
  count: 0
}).write();

var tables = {
  typ: "typ",
  synonym: "synonym",
  synonym_typ: "synonym_typ",
  field: "field",
  fun: "fun"
}


let exports = {}

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


function loadDependency(name) {
  return new Promise(function (resolve, reject) {
    $.getScript(name, function (data, textStatus, jqxhr) {
      if (exports.fun != undefined) {
        global[exports.fun.name] = exports.fun;
      }
      resolve("load!");
    });
  });
}



$(document).ready(async function () {
  fs.readdir(scriptPathConfig, function (err, files) {
    var promises = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let name = (scriptPathConfig || "") + file
      promises.push(loadDependency(name));
    }
    Promise.all(promises).then(function () {
      ready()
    }, function (err) {
      // error occurred
      console.log(err)
    });
  });
})



function ready() {

  myTimer()
  hideAll()
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

  initScriptView();
  // initEditor("main");
  // initQueryBuilder();
  // initObjectBuilder("number", {});
  // initCalc(["a", "b", "c", "aLongerOne", "zehn"])
  // initTypeEditor()
  // initTypeView()
}


