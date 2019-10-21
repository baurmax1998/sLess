
  console.log(__dirname)
  var fs = require('fs');
  eval(fs.readFileSync(__dirname+'/../data/express/main.js')+'');
  main()
  