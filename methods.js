module.exports.methodCreater = function (methods) {
  return methods.reduce((obj, method) => {
      const { name, status, config } = method;
      obj[name] = responseMaker(status, config);
      return obj;
  }, {});
}

module.exports.createMethodNameWithRespectiveConfig = function (config) {
  const customResponsesInfo = [];
  for (const key in config) {
      const keys = key.split(',');
      keys.forEach(status => {
          status = status.trim();
          customResponsesInfo.push({ name: `http${status}`, status, config: config[key] });
      })
  }
  return customResponsesInfo;
}

function responseMaker(status = 200, configuration = '') {
  return function (argument = '', atRootLevel = null) {
      let { response, callback } = configuration;
      let responseMockObject = JSON.parse(JSON.stringify(response));

      if (callback) {
          callback(responseMockObject, argument);
      }

      if (atRootLevel) {
          responseMockObject = { ...responseMockObject, ...atRootLevel };
      }

      if (!response || (response && !response.defaults)) {
          return this.status(status).send(argument);
      }

      switch (typeof argument) {
          case 'string': {
              mapValueToRespone(responseMockObject, 'string', argument);
              break;
          }
          case 'number': {
              mapValueToRespone(responseMockObject, 'number', argument);
              break;
          }
          default: {
              if (Array.isArray(argument)) {
                  mapValueToRespone(responseMockObject, 'array', argument);
                  break;
              }
              mapValueToRespone(responseMockObject, 'object', argument);
          }
      };

      Object.keys(responseMockObject.defaults).forEach(key => {
          const responseDefaultKey = responseMockObject.defaults[key];
          if (!responseDefaultKey.hideIfNotExist)
              responseMockObject[responseDefaultKey.field] = responseMockObject[responseDefaultKey.field] || responseDefaultKey.defaultValue;
      });

      delete responseMockObject.defaults;
      return this.status(status).send(responseMockObject);
  };
}

function mapValueToRespone(responseMockObject, key, argument) {
  const responseDefaultKey = responseMockObject.defaults[key];
  responseDefaultKey && (responseMockObject[responseDefaultKey.field] = argument || responseDefaultKey.defaultValue);
}