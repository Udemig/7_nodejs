const CustomerService = require("../services/customer-service");

//* Webhook
//* Microservis mimarisinde servisler arasında iletişim sağlanması gereken durumlar olabilir.
//* Bu durumda farklı servislerden geln api isteklerinin içeriğine bağlı olarak gerekli işlemleri yapabiliriz.

module.exports = (app) => {
  try {
    const service = new CustomerService();

    app.use("/app-events", async (req, res) => {
      // isteğin body içerisinde gelen payload verisine eriş
      const { payload } = req.body;

      // farklı sevislerden gelen isteğin payload değerine göre bu servisdeki doğru fonksiyonu çalıştır
      await service.SubscribeEvents(payload);

      console.log("========= Customer Servisi Haberi Aldı ==========");

      // istek atan servise geri dönüş yap
      return res.status(200).json(payload);
    });
  } catch (err) {
    console.log("Error", err);
  }
};
