const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const convert = require("xml-js");
const { format } = require("date-fns");

const Cardapio = require("./models/Cardapio");
const routes = require("./routes");
const server = express();

//dotenv
require("dotenv").config();

const port = process.env.PORT || 4000;

mongoose.connect(
  "mongodb+srv://cardapio:FlYvIdUpPxm2fPaP@cluster0-jdqqg.mongodb.net/MenuJoin?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);
server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(port); //porta backend

server.disable("x-powered-by");

async function getSiteVarius() {
  try {
    const apiResponse = await axios.get(
      // `http://www.ru.alegre.ufes.br/cardapio/rss/${format(
      //   new Date(),
      //   "yyyy-MM-dd"
      // )}`
      `http://www.ru.alegre.ufes.br/cardapio/rss/2020-02-07`
    );
    const json = JSON.parse(
      convert.xml2json(apiResponse.data, { compact: true, spaces: 4 })
    );
    const itens = json.rss.channel.item.map(
      ({ description, link, pubDate, title }) => {
        return {
          title: title._text,
          date: pubDate._text,
          link: link._text,
          description: description._text
        };
      }
    );

    itens.map(async item => {
      const { title, date, link, description } = item;
      let idCardapio = `${date.split("/").join("")}-${title
        .split(" ")
        .join("")
        .toLowerCase()}`;

      let cardapioExists = await Cardapio.findOne({ idCardapio });
      if (cardapioExists) {
        console.log(`Cardapio Existente ${idCardapio}`);
      } else {
        const cardapio = await Cardapio.create({
          idCardapio,
          title,
          date,
          link,
          menuJoin: description
        });
        console.log("New Cardapio" + cardapio);
      }
    });
  } catch (e) {
    try {
      const apiResponse = await axios.get(
        "http://www.ru.alegre.ufes.br/cardapio/rss/2019-08-15"
      );
      const json = JSON.parse(
        convert.xml2json(apiResponse.data, { compact: true, spaces: 4 })
      );

      const item = {
        date: json.rss.channel.item.pubDate._text,
        link: json.rss.channel.item.link._text,
        title: json.rss.channel.item.title._text,
        description: json.rss.channel.item.description._text
      };

      const { title, date, link, description } = item;
      let idCardapio = `${date.split("/").join("")}-${title
        .split(" ")
        .join("")
        .toLowerCase()}`;

      let cardapioExists = await Cardapio.findOne({ idCardapio });
      if (cardapioExists) {
        console.log(`Cardapio Existente ${idCardapio}`);
      } else {
        const cardapio = await Cardapio.create({
          idCardapio,
          title,
          date,
          link,
          menuJoin: description
        });
        console.log("New Cardapio" + cardapio);
      }
    } catch (e) {
      console.log("semcardapio disponivel");
    }
  }
}

setInterval(getSiteVarius, 10000);
