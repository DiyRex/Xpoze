import axios from "axios";

    // const botToken = "1049651177:AAHJjJYcDFIKI0YfeMypwglXdwataibyTko";
    // const chatId = "792219547";


const sendTGMessage = async(tgAuth,tgChat,url) =>{
    const apiUrl = `https://api.telegram.org/bot${tgAuth}/sendMessage`;
    
    const messageData = {
      chat_id: tgChat,
      text: "Xpoze : Click to Open URL",
      parse_mode: "markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Xpoze URL",
              url: url,
            },
          ],
        ],
      },
    };
    axios
      .post(apiUrl, messageData)
      .then((response) => {
        // console.log("Message sent successfully:", response.data);
      })
      .catch((error) => {
        error.code === "ERR_BAD_REQUEST"
        ? console.error("\nXpoze Failed: Config Telegram Bot")
        : console.error("Expoze Failed: Failed to Send Message");
        process.exit(0)
      });
}

export default sendTGMessage;