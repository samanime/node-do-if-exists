import 'babel-polyfill';
import globCallback from 'glob';
import shell from 'shelljs';

const glob = pattern => new Promise((resolve, reject) =>
 { globCallback(pattern, (err, files) => err ? reject(err) : resolve(files)) });

export default async (pattern, command, elseCommand) => {
  try {
    const files = await glob(pattern);
    const exists = !!files.length;

    let exitCode = 0;

    try {
      if (exists) {
        exitCode = shell.exec(command);
      } else if (elseCommand) {
        exitCode = shell.exec(elseCommand);
      }
    } catch (e) {
      console.log('failed to execute command', e);
      return { exitCode: 255 };
    }

    return { files, exists, exitCode };
  } catch (e) {
    console.error('glob failed', e);
    return { exitCode: 255 };
  }
};