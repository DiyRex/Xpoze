#!/usr/bin/env node
import fs from 'fs';
import { configTemplate } from './template.js';

let config;
const configFilePath = 'config.json';

const createConfigJSON = async() => {
  let data = JSON.stringify(configTemplate, null, 2); // 2 spaces for indentation
  fs.writeFile("config.json", data, function (err) {
    if (err) throw err;
    console.log("Created Default Config");
    process.exit(0);
  });
};

try {
  const configFileData = fs.readFileSync(configFilePath, 'utf8');
  config = JSON.parse(configFileData);
} catch (error) {
  // File doesn't exist or there's an error reading it
  console.warn(`No existing config file found`);
  await createConfigJSON();
}
  
// Function to save the configuration to a file
export const saveConfigToFile = (item) => {
  const configString = JSON.stringify(config, null, 2);
  fs.writeFileSync('config.json', configString);
  console.log(`${item} saved`);
};

// Function to update configuration based on command line arguments
export const updateConfig = (argv) => {
  if (argv.auth) {
    config.auth = argv.auth;
    saveConfigToFile("Ngrok AuthToken");
    process.exit(0);
  }

  if (argv.tgAuth) {
    config.tgAuth = argv.tgAuth;
    saveConfigToFile("Telegram BotToken");
    process.exit(0);
  }

  if (argv.tgChat) {
    config.tgChat = argv.tgChat;
    saveConfigToFile("Telegram Chat ID");
    process.exit(0);
  }
};

export const getConfigValuesAsString = () => {
    const configFilePath = 'config.json';
    try {
      const configFileData = fs.readFileSync(configFilePath, 'utf8');
      const config = JSON.parse(configFileData);
  
      // Assuming that config has properties: auth, tgAuth, and smtp
      const { auth, tgAuth, tgChat } = config;
  
      // Concatenate the values into a string
      const configString = `Xpose Configurations:\n\nNgrok_Auth: ${auth}\nTG_Bot_Auth: ${tgAuth}\nTG_Chat_ID: ${tgChat}`;
  
      return configString;
    } catch (error) {
      console.error(`Please Config Xpoze`);
    }
  };

  export const getTGData = () => {
    const configFilePath = "config.json";
    try {
      const configFileData = fs.readFileSync(configFilePath, "utf8");
      const config = JSON.parse(configFileData);

      // Assuming that config has properties: auth, tgAuth, and smtp
      const {tgAuth, tgChat } = config;
      return {tgAuth, tgChat};
    } catch (error) {
      //console.error(`Config your Telegram Bot AuthToken`);
      return "Error reading config file";
    }
  }

  export const getNgrokAuth = () => {
    const configFilePath = "config.json";
    try {
      const configFileData = fs.readFileSync(configFilePath, "utf8");
      const config = JSON.parse(configFileData);

      // Assuming that config has properties: auth, tgAuth, and smtp
      const { auth } = config;
      return { auth };
    } catch (error) {
      //console.error(`Config your Ngrok AuthToken`);
      return "Error reading config file";
    }
  }
  
