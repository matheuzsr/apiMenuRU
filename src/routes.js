const express = require("express");
const CardapioController = require("./controllers/CardapioController");

const routes = express.Router();

routes.post("/menu", CardapioController.store);
routes.get("/menu/:idCardapio", CardapioController.show);

module.exports = routes;
