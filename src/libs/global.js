import utils from '@/libs/kit/utils.js';
// import fun from './kit/fun';

import devConfig from './config/devConfig';
import testConfig from './config/testConfig';
import prodConfig from './config/prodConfig';
// import menuModel from './data/menuListModel';

window.trace = utils.trace;

function getConfig() {
  let config;
  if (process.env.VUE_APP_ENV_CONFIG === 'dev') {
    config = devConfig;
  } else if (process.env.VUE_APP_ENV_CONFIG === 'test') {
    config = testConfig;
  } else if (process.env.VUE_APP_ENV_CONFIG === 'prod') {
    config = prodConfig;
  } else {
    config = devConfig;
  }
  return config;
}

const config = getConfig();

export {
  utils,
  config,
};
