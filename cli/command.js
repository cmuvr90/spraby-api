import { execSync, exec } from 'child_process';

class Command {
  constructor(command, before = null, after = null) {
    this.command = command;
    this.before = before;
    this.after = after;
    this.mainCliFile = __dirname + '/index.js';
  }

  static factory(command, before = null, after = null) {
    return new Command(command, before, after);
  }

  run() {
    execSync(this.composeForRun());
  }

  runInBackground() {
    exec(this.composeForRunInBackground());
  }

  composeForRunInBackground() {
    return `(nohup ${this.composeForRun()}) > /dev/null 2>&1 &`;
  }

  composeForRun() {
    const parts = [];
    if (this.before) {
      parts.push(' ' + this.before);
    }

    parts.push(`node ${this.mainCliFile} ${this.command}`);

    if (this.after) {
      parts.push(' ' + this.after);
    }

    return parts.join(' && ');
  }
}

export default Command;