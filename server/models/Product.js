const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
