const dotEnv = require("dotenv");

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  CUSTOMER_ROUTING_KEY: process.env.CUSTOMER_ROUTING_KEY,
  PRODUCT_ROUTING_KEY: process.env.PRODUCT_ROUTING_KEY,
  SHOPPING_ROUTING_KEY: process.env.SHOPPING_ROUTING_KEY,
  QUEUE_NAME: process.env.QUEUE_NAME,
};
