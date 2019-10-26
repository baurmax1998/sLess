function runAny(meta) {
  // var fs = require('fs');
  // var jsparse = require(__dirname + '/../lib/esprima/esprima.js')


  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field.name)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  Object.prototype.expand = function (update) {
    for(var key in update){
      this[key] = update[key];
    }
    return wrap(this)
  };

  global.Types = {"4":{"names":[{"typ":4,"name":"AppConfig","id":4},{"typ":4,"name":"config","id":14}],"fields":[{"from_typ":4,"synonym":5,"typ":1,"name":"name","typname":"string"},{"from_typ":4,"synonym":6,"typ":2,"name":"frontend","typname":"bool"},{"from_typ":4,"synonym":8,"typ":5,"name":"routings","typname":"Array.<object>"},{"from_typ":4,"synonym":9,"typ":0,"name":"port","typname":"number"}]},"7":{"names":[{"typ":7,"name":"NodejsProject","id":11},{"typ":7,"name":"project","id":16}],"fields":[{"from_typ":7,"synonym":12,"typ":1,"beschreibung":"folder with the name of the projekt","name":"path","typname":"string"}]},"8":{"names":[{"typ":8,"name":"buildable","id":13}],"fields":[{"from_typ":8,"synonym":14,"typ":4,"name":"config","typname":"AppConfig"}]},"9":{"names":[{"typ":9,"name":"runable","id":15}],"fields":[{"from_typ":9,"synonym":16,"typ":7,"name":"project","typname":"NodejsProject"},{"from_typ":9,"synonym":17,"typ":2,"beschreibung":"starts the depugger","name":"debug","typname":"bool"}]},"10":{"names":[{"typ":10,"name":"logable","id":18}],"fields":[{"from_typ":10,"synonym":19,"typ":3,"name":"toLog","typname":"object"}]}}
  function wrap(object){
    let typ = undefined;
    
    typ = Types[9]
    if(typ === undefined || object.isTyp(typ.fields)){
      var params = jsparser(run.toString(),{ tolerant: true }).body[0].params;
      if(params.length == 0){
        throw new Error("no Parameter Function can#t be attacht to objekt");
      } else if(params.length == 1){
        object.run = function () {
          var returns = run(this)
          if (returns === undefined) {
            return this;
          }
        }   
      } else {
        if(params.length == 2){
          //todo make it fluit
        }
        object.run = function () {
          var returns = run(this[params[0].name], this[params[1].name])
          if (returns === undefined) {
            return this;
          }
        }
      }
    }

    return object;
  }
  
  eval(fs.readFileSync(__dirname + '/data/express/main.js')+'');
  global.main = main;
  eval(fs.readFileSync(__dirname + '/data/express/build.js')+'');
  global.build = build;
  eval(fs.readFileSync(__dirname + '/data/express/run.js')+'');
  global.run = run;
  eval(fs.readFileSync(__dirname + '/data/express/log.js')+'');
  global.log = log;



  ({project: {path: "hallo"}, debug: true}).wrap().expand({"more": "param"}).run()
  console.log("ende")
}



// function runAnyFinal(meta) {
//   var Sqrl = require("squirrelly");
//   Sqrl.autoEscaping(false)

//   var fs = require('fs');
//   var dir = './tmp';

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }

//   var package = writeFile("./tmp/package.json", `{
//     "name": "tmp",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//       "test": "echo Error: no test specified && exit 1"
//     },
//     "author": "",
//     "license": "ISC"
//   }`)

//   let indexjsTempl = `
// setTimeout(function () {  
//   var fs = require('fs');

//   var jsparse = require(__dirname + '/../lib/esprima/esprima.js')



//   Object.prototype.isTyp = function (fields) {
//     var keys =  Object.keys(this)
//     return fields.every(function(field){return keys.includes(field)})
//   };

//   Object.prototype.wrap = function () {
//     return wrap(this)
//   };

//   global.Types = {{typesString}}

//   function wrap(object){
//     let typ = undefined;
// {{each(options.funs)}}
//     typ = Types[{{@this.param}}]
//     if(typ === undefined || object.isTyp(typ.fields))
//       {{@this.name}}()
// {{/each}}
//   }
  
// {{each(options.funs)}}
//   eval(fs.readFileSync(__dirname + '/../data/express/{{@this.path}}')+'');
//   global.{{@this.name}} = {{@this.name}};
// {{/each}}



//   ({"hallo":"welt"}).wrap().expand({"more": "param"}).log()
//   console.log("ende")
//   // main()
// }, 5000);
//   `

//   var allFuns = getAllFuns()
//   var allSynonyms = getAllSynonyms()
//   var allFields = getAllFields()

//   var synonymsToTyp = Stream(allSynonyms).groupBy("typ")

//   var fieldsToTyp = Stream(allFields)
//   .map(function (field) {
//     field.name = findSynonymById(field.synonym)[0].name
//     field.typname = findSynonymForTyp(field.typ)[0].name
//     return field;
//   })
//   .groupBy("from_typ")

//   var Types = {}
//   for(var key in fieldsToTyp){
//     Types[key] = {
//       names: synonymsToTyp[key],
//       fields: fieldsToTyp[key]
//     }
//   }




//   var indexjs = Sqrl.Render(indexjsTempl, {
//     funs: allFuns,
//     typesString: JSON.stringify(Types)
//   })


  

//   writeFile("./tmp/index.js", indexjs)
//   console.log(indexjs)

//   const { spawn } = require('child_process');
//   const debugg = spawn('rawkit', ['./tmp/index.js']);

//   debugg.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   debugg.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   debugg.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

// }

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