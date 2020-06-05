const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category Title is Required"],
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
