const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const server = express();

const InformationRSS = require("./services/InformationRSS");
const InformationsRSS = require("./services/InformationsRSS");

//dotenv
require("dotenv").config();

const port = process.env.PORT || 4000;

mongoose.connect(
  "mongodb+srv://cardapio:FlYvIdUpPxm2fPaP@cluster0-jdqqg.mongodb.net/MenuRU?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(port); //porta backend

server.disable("x-powered-by");

async function getInformationRss() {
  try {
    InformationsRSS.getInformations();
  } catch (e) {
    try {
    InformationRSS.getInformations();
    } catch (e) {
      console.log("semcardapio disponivel");
    }
  }
}

setInterval(getInformationRss, 18000);
