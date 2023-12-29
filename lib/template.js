const helpMessage = `
Xpoze (Expose your Localhost the Web)

Command :
  --port     : Port of the Localhost  [--port=5500]
  -h, --help : Show Help Message

Configurations:
  --auth    Set Ngrok Auth Token  [string]
  --tgAuth  Set Telegram Bot Token  [string]
  --tgChat  Set Telegram Chat ID  [string]
  --config  View the configurations

Note:
  To use the Telegram bot, set both the BotToken (--tgAuth) and the ChatID (--tgChat)
`;

const configTemplate = {
  auth: "default_auth_token",
  tgAuth: "default_telegram_auth_token",
  tgChat: "default_telegram_chat_id",
};

export { helpMessage, configTemplate };