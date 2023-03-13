/** memanggi library express */
const express = require('express');
const { Op } = require('sequelize');

// membuat objek express nya
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//import model
const detail_pemesanan = require('../models/index').detail_pemesanan;
const tipe_kamar = require('../models/index').tipe_kamar;
const pelanggan = require('../models/index').pelanggan;
const kamar = require('../models/index').kamar;
const pemesanan = require('../models/index').pemesanan;
// const detail_pemesanan = require('../models/index').detail_pemesanan;


app.get('/', auth, async (req, res) => {
    await detail_pemesanan.findAll({
        include: [
            {
                model: kamar,
                as: "kamar",
                attributes: ['nomor_kamar', 'id_tipe_kamar'],
                include: [{ model: tipe_kamar, as: "tipe_kamar" }]
            },
            {
                model: pemesanan,
                as: "pemesanan",
                include: [{ model: pelanggan, as: "pelanggan" }]
            }
        ],
    })
        .then(result => res.json({ pemesanan: result }))
        .catch(error => res.json({ message: error.message }));
});

app.get("/:id", auth, async (req, res) => {
    let param = { id_pemesanan: req.params.id }
    await detail_pemesanan.findAll({
        where: param,
        include: [
            {
                model: kamar,
                as: "kamar",
                attributes: ['nomor_kamar', 'id_tipe_kamar'],
                include: [{ model: tipe_kamar, as: "tipe_kamar" }]
            },
            {
                model: pemesanan,
                as: "pemesanan",
                include: [{ model: pelanggan, as: "pelanggan" }]
            }
        ],
    })
        .then(result => res.json({ pemesanan: result }))
        .catch(error => res.json({ message: error.message }));
})

app.put('/:id', auth, async (req, res) => {
    let params = { id_detail_pemesanan: req.params.id }
    let data = {
        id_pemesanan: req.body.id_pemesanan,
        id_kamar: req.body.id_kamar,
        tgl_akes: req.body.tgl_akes,
        harga: req.body.harga
    }

    await detail_pemesanan.update(data, { where: params , include : ['kamar', 'pemesanan']})
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

app.delete("/:id", auth, async (req, res) => {
    let param = { id_detail_pemesanan: req.params.id }
   
    await detail_pemesanan.destroy({ where: param, include : ['kamar', 'pemesanan'] })

    await pemesanan.destroy({ where: param })
        .then(result => {
            res.json({ message: "Data has been deleted" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

module.exports = app;