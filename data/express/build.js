
/**
  * build or extends a node.js projekt for an express app config
  * @param {AppConfig} config 
  * @returns {NodejsProject}
*/ 
exports.fun = function build(config) {
  console.log(config.name)
  console.log(config.frontend)
  console.log(config.routings)
  console.log(config.port)
  return {
    path: "temp"
  }
}
