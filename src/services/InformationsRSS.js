const axios = require("axios");
const convert = require("xml-js");
const { format } = require("date-fns");
const SeparateWordsArray = require("./utils/SeparateWordsArray");

const Menu = require("../models/Menu");

module.exports = {
  async getInformations() {
    const apiResponse = await axios.get(
      `http://www.ru.alegre.ufes.br/cardapio/rss/${format(
        new Date(),
        "yyyy-MM-dd"
      )}`
      //"http://www.ru.alegre.ufes.br/cardapio/rss/2020-02-06"
    );
    const json = JSON.parse(
      convert.xml2json(apiResponse.data, { compact: true, spaces: 4 })
    );
    if (json.rss.channel.item) {
      const itens = json.rss.channel.item.map(
        ({ description, link, pubDate, title }) => {
          return {
            title: title._text,
            date: pubDate._text,
            link: link._text,
            description: description._text,
          };
        }
      );
        itens.map(async (item) => {
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
      });
    }
  },
};
