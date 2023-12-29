#!/usr/bin/env node

import { ngrokTunnel, killServer } from "./lib/ngrok.js";
import qrcode from "qrcode-terminal";
import inquirer from "inquirer";
import yargs from "yargs/yargs";
import sendTGMessage from "./lib/telebot.js";
import getLocalIPv4Address from "./lib/ip.js";
import { helpMessage } from "./lib/template.js";
import {
  updateConfig,
  getConfigValuesAsString,
  getTGData,
  getNgrokAuth,
} from "./lib/config.js";

const { tgAuth, tgChat } = getTGData();
const { auth } = getNgrokAuth();
const netIP = getLocalIPv4Address();
let global_ngrok_url;

// yargs configurations
const argv = yargs(process.argv.slice(2))
  .options({
    port: {
      describe: "Port of the Localhost",
      demandOption: false,
      type: "number",
      hidden: true,
    },
    auth: {
      describe: "Set Ngrok Auth Token",
      demandOption: false,
      type: "string",
      hidden: true,
    },
    tgAuth: {
      describe: "Set Telegram Bot Token",
      demandOption: false,
      type: "string",
      hidden: true,
    },
    tgChat: {
      describe: "Set Telegram Chat ID",
      demandOption: false,
      type: "string",
      hidden: true,
    },
    config: {
      describe: "Print config values",
      type: "boolean",
      hidden: true,
    },
    h: {
      alias: "help",
      describe: "Show help message",
      type: "boolean",
      hidden: true,
    },
  })
  .version(false)
  .wrap(null)
  .usage(helpMessage)
  .strict().argv;

// Display help message if -h or --help is provided
if (argv.h) {
  yargs.showHelp();
  process.exit(0);
} else if (argv.config) {
  const valuesString = getConfigValuesAsString();
  if (valuesString) {
    console.log(`\n${valuesString}\n`);
    process.exit(0);
  } else {
    null;
  }
}

// Update configuration based on command line arguments
updateConfig(argv);

const port = argv.port; // Port

async function RunTunnel(port) {
  try {
    const ngrok_url = await ngrokTunnel(port, auth);
    let isConnected = new Promise((resolve, reject) => {
      if (ngrok_url) {
        resolve(ngrok_url);
        global_ngrok_url = ngrok_url;
      }
    });
    isConnected.then((url) => {
      console.log("");
      console.log("Xpoze is Running !\n");
      console.log(`Local URL   : http://localhost:${port}`); // localhost url
      console.log(`Network URL : http://${netIP}:${port}`); // localhost url
      console.log(`Ngrok URL   : ${url}`); // public ngrok url
      console.log("");
      console.log("Scan the QR code to access the URL");
      qrcode.generate(url, { small: true }); // generate qr-code in terminal (ngrok url)
      console.log(`              Script by DiyRex :)\n`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

//menu
const options = ["Send URL Via Telegram", "Restart Xpoze", "Quit Xpoze"];

const getUserInput = async () => {
  const questions = [
    {
      type: "list",
      name: "selectedOption",
      message: "Select an option:",
      choices: options,
    },
  ];

  const answers = await inquirer.prompt(questions);
  console.log(`You selected: ${answers.selectedOption}`);

  // clean previous answer
  if (answers.selectedOption) {
    const menuLines = options.length;
    const startingLine = process.stdout.rows - menuLines;
    process.stdout.write(`\x1B[${startingLine};1H\x1B[J`);
  }

  if (answers.selectedOption == "Send URL Via Telegram") {
    await sendTGMessage(tgAuth, tgChat, global_ngrok_url);
  } else if (answers.selectedOption == "Quit Xpoze") {
    await killServer();
    process.stdout.write("\x1Bc");
    console.log("\nBye! from Xpoze :)\n");
    process.exit(0);
  } else if (answers.selectedOption == "Restart Xpoze") {
    await killServer();
    process.stdout.write("\x1Bc");
    await RunTunnel(port, auth);
  }
  await getUserInput(); // Run menu recursively
};

// Start
try{
await RunTunnel(port,auth);
await getUserInput();
}catch(error){
  console.error("Failed to Start Xpoze :(")
}

