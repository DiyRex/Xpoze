# Xpoze v1.0.2

[![npm version](https://badge.fury.io/js/xpoze.svg)](https://www.npmjs.com/package/xpoze)

Expose your localhost to the web via Ngrok effortlessly.

## Installation

```bash
npm install -g xpoze
```
You must install Xpoze globally to use it as a command-line tool.

## Usage

After installation, you can use the following command to verify that Xpoze is installed correctly:

```bash
xpoze -h
```
#### Activation
To activate Xpoze with Ngrok authentication, run:
```bash
xpoze --auth=<ngrok auth>
```
#### Telegram Bot Configuration (Optional)
If you want to use the Telegram bot feature, 
you can configure it by providing your Telegram bot token and chat ID: 
(Both Required !)

```bash
xpoze --tgAuth=<telegram bot token>
xpoze --tgChat=<telegram chat ID>
```
#### Configurations

To view the current configurations, use:
```bash
xpoze --config
```
#### Run Xpoze (after previous configurations)
After Configurations you can expose your localhost to the web using Xpoze, 
run the following command with the port of your local server:

```bash
xpoze --port=<port of localhost server>
```

## Features
+ Show Ngrok URL as a QR code in the terminal
+ Provide options to send URL to a Telegram bot

## Dependencies
Xpoze uses the following dependencies:

+ ngrok
+ yargs
+ axios
+ inquirer
+ qrcode-terminal

## Author
- [DiyRex](https://github.com/DiyRex)

## License
This project is licensed under the MIT License
