const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const SECRET_KEY = 'secretkkey';

const auth = require('../middleware/auth');
const kamar = require('../models/index').kamar;
// const upload = require('../middleware/imageRoom');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", auth, async (req, res) => {
    kamar.findAll({
        include: ["tipe_kamar"]
    })
        .then(result => {
            res.json({ data: result })
        })
        .catch(error => {
            res.json({ message: error.messag })
        })
})

app.get("/:id", auth, async (req, res) => {
    let param = { id_kamar: req.params.id }
    kamar.findOne({ where: param })
        .then(result => {
            res.json({ data: result })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.post("/", auth, async (req, res) => {
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar
    }
    kamar.create(data)
        .then(result => {
            res.json({ message: "Data has been updated", data: result })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.put("/:id", auth, async (req, res) => {
    let param = { id_kamar: req.params.id }
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar
    }
    await kamar.update(data, { where: param })
        .then(result => {
            res.json({ message: "Data has been updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.delete("/:id", auth, async (req, res) => {
    let param = {
        id_kamar: req.params.id
    }
    kamar.destroy({ where: param })
        .then(result => {
            res.json({ message: "Data has been deleted" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})
module.exports = app