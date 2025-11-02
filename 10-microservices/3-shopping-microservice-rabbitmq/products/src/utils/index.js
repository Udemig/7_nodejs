const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const {
  APP_SECRET,
  RABBITMQ_URI,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//! Rabbitmq
//* Diğer servislere rabbitmq ile mesaj göndericek fonksiyonlar

//! Kanal oluştur
module.exports.CreateChannel = async () => {
  try {
    // rabbitmq sunucusuna bağlan
    const connection = await amqp.connect(RABBITMQ_URI);

    // kanal oluştur
    const channel = await connection.createChannel();

    // exchange oluştur
    // exchange: kanala gelen mesakarı alığ kuyruğa yönlendiren bir mekanizma
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);

    // kanal'ı return et
    return channel;
  } catch (error) {
    throw error;
  }
};

//! Mesaj yayınla
module.exports.PublishMessage = async (channel, routingKey, message) => {
  try {
    await channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );

    console.log(`💥 Message kanala gönderildi`, routingKey);
  } catch (error) {
    throw error;
  }
};

//! Mesaj kuyuruğuna abone ol
module.exports.SubscribeMessage = async (channel, routingKey) => {
  try {
    // yeni bir kuyruk oluştur
    const appQueue = await channel.assertQueue(QUEUE_NAME);

    // kuyruğu kanala bağla
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, routingKey);

    // kuyruktaki mesajlara abone ol
    channel.consume(appQueue.queue, (data) => {
      console.log("💥 Kuyruktan Mesaj alındı");
      console.log(data.content.toString());
    });
  } catch (error) {
    throw error;
  }
};
