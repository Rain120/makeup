const replace = require('replace-in-file');

const fixFormatWebpackMessages = async () => {
  try {
    const results = await replace({
      files: 'node_modules/react-dev-utils/formatWebpackMessages.js',
      from: `let lines = message.split('\\n');`,
      to: `let lines = (typeof message === 'string' ? message : message['message']).split('\\n');`,
    });
  } catch (e) {
    console.log('error while trying to fix  "formatWebpackMessages.js"', e);
  }
};

fixFormatWebpackMessages();
