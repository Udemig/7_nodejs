const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use(express.json());

//* Client tarafı istek atarken sürekli farklı portlara istek atmasınının önüne geçmek için proxy kullanıyoruz.
//* Proxy client'tan gelen isteği farklı sunuculara / portlara yönlendirmemizi sağlar
app.use("/customer", proxy("http://localhost:3001"));
app.use("/shopping", proxy("http://localhost:3003"));
app.use("/", proxy("http://localhost:3002"));

app.listen(3000, () => {
  console.log("Gateway Service 3000 portunda çalışıyor");
});
