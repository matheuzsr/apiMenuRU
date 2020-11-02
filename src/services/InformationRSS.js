const axios = require("axios");
const convert = require("xml-js");
const { format } = require("date-fns");
const SeparateWordsArray = require("./utils/SeparateWordsArray");

const Menu = require("../models/Menu");

module.exports = {
  async getInformation() {
    const apiResponse = await axios.get(
      `http://www.ru.alegre.ufes.br/cardapio/rss/${format(
        new Date(),
        "yyyy-MM-dd"
      )}`
      //"http://www.ru.alegre.ufes.br/cardapio/rss/2020-02-07"
    );
    const json = JSON.parse(
      convert.xml2json(apiResponse.data, { compact: true, spaces: 4 })
    );

    const item = {
      date: json.rss.channel.item.pubDate._text,
      link: json.rss.channel.item.link._text,
      title: json.rss.channel.item.title._text,
      description: json.rss.channel.item.description._text,
    };

    const { title, date, link, description } = item;
    let idCardapio = `${date.split("/").join("")}-${title
      .split(" ")
      .join("")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}`;

    let cardapioExists = await Menu.findOne({ idCardapio });
    if (cardapioExists) {
      console.log(`Cardapio Existente ${idCardapio}`);
    } else {
      const cardapio = await Menu.create({
        idCardapio,
        title,
        date,
        link,
        menu: SeparateWordsArray.separateText(description),
      });
      console.log("New Cardapio" + cardapio);
    }
  },
};
