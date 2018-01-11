#! /usr/bin/env node
/* global process */
import doIfExists from '..';

const [, , pattern, command, elseCommand, ...options] = process.argv;

(async () => {
  try {
    const { files = [], exists, exitCode } = await doIfExists(pattern, command, elseCommand);

    if (options.includes('-v')) {
      console.log(`
${exists ? 'Files existed' : 'Files did not exist'}
Files: ${files.join(', ')}
    `.trim());

      process.exit(exitCode);
    }
  } catch (e) {
    console.error(e);
    process.exit(255);
  }
})();