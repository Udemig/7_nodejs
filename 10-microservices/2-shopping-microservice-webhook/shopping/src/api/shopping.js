const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ShoppingService();

  app.post("/shopping/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });

      // cusstomer servisine haber gönder
      PublishCustomerEvent({
        event: "CREATE_ORDER",
        data: {
          userId: _id,
          order: data,
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/shopping/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/shopping/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await service.GetCart(_id);
      return res.status(200).json(data.cart);
    } catch (err) {
      next(err);
    }
  });
};
