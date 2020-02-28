const Cardapio = require("../models/Cardapio");

module.exports = {
  async index(request, response) {
    const menu = await Cardapio.find();
    return response.json(menu);
  },

  async show(request, response) {
    const { id } = request.params;
    const menu = await Cardapio.findById({ _id: id });

    return response.json(menu);
  },

  async store(req, resp) {
    const { idCardapio, title, date, link, menuJoin } = req.body;
    const cardapioExists = await Cardapio.findOne({ idCardapio: idCardapio });

    if (cardapioExists) {
      console.log(`Cardapio Existente ${idCardapio}`);
      return resp.json(cardapioExists);
    }
    const cardapio = await Cardapio.create({
      idCardapio,
      title,
      date,
      link,
      menuJoin
    });
    return resp.json(cardapio);
  }
};
