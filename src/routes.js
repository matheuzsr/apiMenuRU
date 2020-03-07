const express = require("express");
const CardapioController = require("./controllers/CardapioController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Ok!" });
});
routes.get("/menu", CardapioController.index);
routes.get("/menu/:idCardapio", CardapioController.show);
routes.post("/menu", CardapioController.store);

module.exports = routes;
