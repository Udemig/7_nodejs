const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    // * Monolithic mimaride burada refenrence yöntemi kullanılıyordu ama microservice'de farklı bir veritabanından referans göstermek mümkün olmadığı için embedding yöntemini tercih ettik
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, required: true },
      },
    ],
    //* reference =====> embedding
    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        banner: { type: String },
        price: { type: Number },
        desc: { type: String },
        available: { type: Boolean },
      },
    ],
    //* reference =====> embedding
    orders: [
      {
        _id: { type: String, required: true },
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
