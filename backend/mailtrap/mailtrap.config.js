// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// export const mailtrapClient = new MailtrapClient({
//   endpoint: process.env.MAILTRAP_ENDPOINT,
//   token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "NIYATI NAGAR",
// };
// mailtrap.config.js
const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");

dotenv.config();

const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT, 
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "CartsureX",
};

module.exports = {
  mailtrapClient,
  sender
};