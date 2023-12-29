#!/usr/bin/env node
import ngrok from "ngrok";

const ngrokTunnel = async (port, auth) => {
  try {
    const ngrok_url = await ngrok.connect({
      proto: "http",
      addr: port,
      authtoken: auth,
    });
    return ngrok_url;
  } catch (error) {
    error.code === "ECONNREFUSED"
      ? console.error("Xpoze Failed: Config your Ngrok AuthToken")
      : console.error("Xpoze Failed: Something Went Wrong!");
    process.exit(0);
  }
};

const killServer = async () => {
  await ngrok.disconnect(); // stops all
  await ngrok.kill(); // kills ngrok process
};

export { ngrokTunnel, killServer };
