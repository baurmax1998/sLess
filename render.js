const fs = require("fs");
const parser = require("jsdoc3-parser");



function readPaths(path) {
  return new Promise(resolve => {
    fs.readdir(path, function (err, files) {
      handleError(err);
      resolve(files);
    });
  });
}


function readFile(aPath) {
  return new Promise(resolve => {
    fs.readFile(aPath, "utf8", function (err, text) {
      handleError(err);
      resolve(text);
    });
  })
}

function writeFile(aPath, aText) {
  return new Promise(resolve => {
    fs.writeFile(aPath, aText, "utf8", function (err) {
      handleError(err);
      resolve('saved!');
    });
  });
}


function parseDoc(aPath) {
  return new Promise(resolve => {
    parser(aPath, function (err, docs) {
      handleError(err);
      for (let doc of docs) {
        if (doc.meta != undefined && doc.meta.filename.split(".")[0] == doc.name) {
          resolve(doc);
          return;
        }
      }
      resolve(null)
    });
  })
}

function handleError(err) {
  if (err) return console.error(err);
}

function getScriptColor(meta) {
  var filterOptions = ['red', 'blue', 'green', 'orange'];
  const scriptTypes = {
    Function: "green",
    Consumer: "blue",
    Supplier: "orange",
    Runnable: "red"
  }
  if (meta.returns == []) {
    if (meta.params == []) {
      return scriptTypes.Runnable;
    } else {
      return scriptTypes.Consumer;
    }
  } else {
    if (meta.params == []) {
      return scriptTypes.Supplier;
    } else {
      return scriptTypes.Function;
    }
  }
}

function getScriptParams(params) {
  var paramsElement = $("<p>");
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    paramsElement.append(
      $("<span class='param'>").attr("title", param.description)
        .append($("<span>").text(param.name))
        .append($("<a href='#' class='w3-tag w3-round w3-green'>").text(param.type.names[0]))
    )
  }
  return paramsElement;
}

function getScriptReturn(returns) {
  return $("<p>")
    .append(
      $("<a href='#' class='w3-tag w3-round'>")
        .text(returns[0].type.names[0]))
}

$(document).ready(function () {
  $("#code_editor").hide();
  addFunction("userf", "red", "fa-user");
  addFunction("searchf", "green", "fa-search");
  addFunction("editf", "purple", "fa-edit");
  $("#editf").on("click", function () {
    $("#main").hide();
    $("#code_editor").show();
  });
  $("#searchf").on("click", function () {
    $("#main").show();
    $("#code_editor").hide();
  });
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();

  // initDemo();
  // initEditor();
  // initQueryBuilder();
})

