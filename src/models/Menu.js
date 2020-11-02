const { Schema, model } = require("mongoose");

const MenuSchema = new Schema(
  {
    idCardapio: String,
    title: String,
    date: String,
    link: String,
    menu: Object,
  },
  {
    timestamps: true
  }
);

module.exports = model("Menu", MenuSchema);
