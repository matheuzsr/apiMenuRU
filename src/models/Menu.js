const { Schema, model } = require("mongoose");

const MenuSchema = new Schema(
  {
    idCardapio: String,
    title: String,
    date: String,
    link: String,
    menuJoin: String
  },
  {
    timestamps: true
  }
);

module.exports = model("Menu", MenuSchema);
