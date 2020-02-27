const { Schema, model } = require('mongoose')

const CardapioSchema = new Schema({

    idCardapio: String,
    title: String,
    date: String,
    link: String,
    menuJoin: String,

}, {
    timestamps: true
})

module.exports = model('Cardapio', CardapioSchema)