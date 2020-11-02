const Menu = require("../models/Menu");

module.exports = {
  async index(request, response) {
    const menu = await Menu.find();
    return response.json(menu);
  },

  async show(request, response) {
    const { idCardapio } = request.params;
    const menu = await Menu.findOne({ idCardapio: idCardapio });

    return response.json(menu);
  },

  async store(req, resp) {
    const { idCardapio, title, date, link, menuText } = req.body;
    const cardapioExists = await Menu.findOne({ idCardapio: idCardapio });

    if (cardapioExists) {
      console.log(`Cardapio Existente ${idCardapio}`);
      return resp.json(cardapioExists);
    }
    const cardapio = await Menu.create({
      idCardapio,
      title,
      date,
      link,
      menuText,
    });
    return resp.json(cardapio);
  },
};
