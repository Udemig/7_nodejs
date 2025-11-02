const { OrderModel, CartModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError } = require("../../utils/app-errors");

//Dealing with data base operations
class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId }).populate(
        "items.product"
      );
      return orders;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Orders"
      );
    }
  }

  async CreateNewOrder(customerId, txnId) {
    try {
      const cart = await CartModel.findOne({ customerId });

      if (cart) {
        let amount = 0;

        let cartItems = cart.items;

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          cart.items = [];

          const orderResult = await order.save();

          await cart.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      console.log("Error in CreateNewOrder", err);
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async GetCart(customerId) {
    try {
      const cart = await CartModel.findOne({ customerId });
      return cart;
    } catch (error) {
      throw new APIError("API Error", 500, "Unable to find cart");
    }
  }

  async UpdateCart(customerId, product, qty, isRemove) {
    const cart = await CartModel.findOne({ customerId });

    if (cart) {
      // kullanıcnın sepeti varsa:
      let isExist = false;
      let cartItems = cart.items;

      // eğer sepette ürün varsa:
      if (cartItems.length > 0) {
        cartItems = cartItems
          .map((item) => {
            if (item._id === product._id) {
              if (isRemove) {
                // isRemove true ise ürünü sil
                return null;
              } else {
                // isRemove false ise ürünü güncelle
                isExist = true;
                return { ...item, unit: qty };
              }
            }
          })
          .filter(Boolean);
      }

      // eğer ürün sepette yoksa ve silme işlemi yapılmayacaksa:
      if (!isExist && !isRemove) {
        cartItems.push({ ...product, unit: qty });
      }

      // veritabanına güncellemeyi kaydet
      cart.items = cartItems;
      return await cart.save();
    } else {
      // kullanıcnın sepeti yoksa:
      return await CartModel.create({
        customerId,
        items: [{ ...product, unit: qty }],
      });
    }
  }
}

module.exports = ShoppingRepository;
