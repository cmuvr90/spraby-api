require("@babel/register")({
  presets: ["@babel/preset-env"],
  ignore: ["node_modules"],
  plugins: [["@babel/transform-runtime"]],
});

const TestRunCommand = require('./commands/TestRunCommand').default;

const parseArgs = require("minimist");
const process = require("process");
const cli = require("./cliApp");

cli.createCliApp().then(app => {

  const commands = {
    "test:run": new TestRunCommand(app.ioc),
  };

  const args = parseArgs(process.argv.slice(2));

  if (!args["command"] || !commands.hasOwnProperty(args["command"])) {
    throw new Error("Command not exist");
  }

  commands[args["command"]].handle(args).then(() => {
    process.exit(0)
  }).catch(async e => {
    console.log(e);
    process.exit(1)
  });
});


