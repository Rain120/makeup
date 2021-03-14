const { getLoader } = require('react-app-rewired');
const tsImportPluginFactory = require('ts-import-plugin');
const { override, addWebpackAlias } = require('customize-cra');

const path = require('path');

module.exports = function override(config, env) {
  const tsLoader = getLoader(config.module.rules, rule => String(rule.test) === String(/\.(ts|tsx)$/));

  tsLoader.options = {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory([
          {
            libraryName: 'antd',
            libraryDirectory: 'lib',
            style: 'css',
          },
        ]),
      ],
    }),
  };

  config.output.path = path.dirname(config.output.path || '/');

  return config;
};
