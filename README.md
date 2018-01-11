# do-if-exists

CLI command for running a command only if at least one file exists.

Globs are powered by [`glob`](https://www.npmjs.com/package/glob)
Commands are powered by [`shelljs`](https://www.npmjs.com/package/shelljs)

## CLI

### Usage

    do-if-exists glob [if-exists-command] [else-command] [-v]

If you include `-v`, it will output the list of files it finds (if any)
and which condition it needs. This can be useful for debugging the command.

Exits with `255` if there was a problem, otherwise exits with the code
of the command run.

### Example

    do-if-exists src/**/*.js "echo JS files exist"
    do-if-exists src/**/*.js "echo JS files exist" "echo No JS files"

## API

The function is also available for use via JavaScript:

    import doIfExists from 'do-if-exists';

    doIfExists(pattern, command, elseCommand, verbose)
      .then(({ files, exists }) => console.log(exists));

### Parameters

- `pattern` - string - The glob string
- `command` - string - The command string
- `elseCommand` - string - Optional. The else command string. Default: null
- `verbose` - boolean - Optional. Whether to output verbosely. Default: false

### Return

A `Promise` which will resolve with an object containing:

 - `files` - The list of files found,
 - `exists` - If any files exist (same as `!!files.length`)
 - `exitCode` - The exit code of the command (or 0 if none was run).