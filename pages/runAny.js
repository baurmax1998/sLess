function runAny(meta) {

  var Sqrl = require("squirrelly");
  Sqrl.autoEscaping(false)

  var fs = require('fs');
  var dir = './tmp';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var package = writeFile("./tmp/package.json", `{
    "name": "tmp",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo Error: no test specified && exit 1"
    },
    "author": "",
    "license": "ISC"
  }`)

  let indexjsTempl = `

setTimeout(function () {  
  var fs = require('fs');

{{each(options.funs)}}
  global.{{@this.name}} = require( __dirname + '/../data/express/{{@this.path}}').fun;
{{/each}}

  var jsparser = require(__dirname + '/../lib/esprima/esprima.js').parse
  global.Types = {{typesString}}

  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field.name)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  function _(ob){
    return wrap(ob)
  }

  Object.prototype.expand = function (update) {
    for(var key in update){
      this[key] = update[key];
    }
    return wrap(this)
  };

  function wrapOne(object, typId, name) {
    const typ = Types[typId]
    let fun = this[name]
    if(typ != undefined 
      && (
        object.isTyp(typ.fields) 
        || (typ.fields.length == 1 
          && (typ.fields[0].typname == "object"
          ||object.isTyp(Types[typ.fields[0].typ].fields))))){
      let params = jsparser(fun.toString(),{ tolerant: true }).body[0].params;
      if(params.length == 0){
        throw new Error("no Parameter Function can#t be attacht to objekt" + name);
      } else if(params.length == 1){
        object[name] = function () {
          var returns = fun(this)
          if (returns === undefined) {
            return this;
          }
        }   
      } else {
        if(params.length == 2){
          //todo make it fluit
        }
        object[name] = function () {
          var paramValues = []
          for (let i = 0; i < params.length; i++) {
            const param = params[i];
            paramValues.push(this[param.name])
          }
          var returns = fun.apply(null, paramValues)
          if (returns === undefined) {
            return this;
          }
        }
      }
    }
    
  }



  function wrap(object){
{{each(options.funs)}}
    wrapOne(object, {{@this.param}}, "{{@this.name}}")
{{/each}}
    return object;

  }
  
  debugger;
  {{called.name}}()
}, 1000);

  `

  var allFuns = getAllFuns()
  var allSynonyms = getAllSynonyms()
  var allFields = getAllFields()

  var synonymsToTyp = Stream(allSynonyms).groupBy("typ")

  var fieldsToTyp = Stream(allFields)
  .map(function (field) {
    field.name = findSynonymById(field.synonym)[0].name
    field.typname = findSynonymForTyp(field.typ)[0].name
    return field;
  })
  .groupBy("from_typ")

  var Types = {}
  for(var key in fieldsToTyp){
    Types[key] = {
      names: synonymsToTyp[key],
      fields: fieldsToTyp[key]
    }
  }




  var indexjs = Sqrl.Render(indexjsTempl, {
    funs: allFuns,
    typesString: JSON.stringify(Types),
    called: meta
  })


  

  writeFile("./tmp/index.js", indexjs)
  console.log(indexjs)

  const { spawn } = require('child_process');
  const debugg = spawn('rawkit', ['./tmp/index.js']);

  debugg.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  debugg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  debugg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}

// //Load HTTP module
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 3000;

// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {

//   //Set the response HTTP header with HTTP status and Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



// const { spawn } = require('child_process');
// const debugg = spawn('rawkit', ['--inspect-brk', 'any.js']);

// debugg.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// debugg.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// debugg.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });