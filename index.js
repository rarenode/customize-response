module.exports = function ({ reponsesConfigFilePath = './rare-responses-config' }) {
  const responseConfig = require(`${process.cwd()}/${reponsesConfigFilePath}`);
  const methodsInfo = require('./methods').createMethodNameWithRespectiveConfig(responseConfig);
  const methods = require('./methods').methodCreater(methodsInfo);

  return function (req, res, next) {
      for (const func in methods) {
          res[func] = methods[func];
      }
      next();
  };
};
