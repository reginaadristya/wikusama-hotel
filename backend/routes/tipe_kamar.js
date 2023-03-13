const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const SECRET_KEY = 'secretkkey';

const auth = require('../middleware/auth');
const tipe_kamar = require('../models/index').tipe_kamar;
const { uploadTypeRoom } = require('../middleware/uploadImage');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await tipe_kamar.findAll()
        .then(result => res.json({ tipe_kamar: result }))
        .catch(error => res.json({ message: error.message }));
});

app.get('/:id_tipe_kamar', auth, async (req, res) => {
    let params = { id_tipe_kamar: req.params.id_tipe_kamar };

    await tipe_kamar.findAll({ where: params, include: ['kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.post('/', auth, uploadTypeRoom.single('foto'), async (req, res) => {
    if (!req.file) return res.json({ message: 'File not found' });

    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        foto: req.file.filename
    }

    await tipe_kamar.create(data)
        .then(result => res.json({ message: 'Data has been inserted', data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.put('/:id', auth, uploadTypeRoom.single('foto'), async (req, res) => {
    let param = { id_tipe_kamar: req.params.id }
    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        // foto: req.body.filename
    }
    if (req.file) {
        // get data by id
        tipe_kamar.findOne({ where: param })
            .then(result => {
                let oldFileName = result.foto

                // delete old file
                let dir = path.join(__dirname, "../img/room", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(error => {
                console.log(error.message);
            })

        // set new filename
        data.foto = req.file.filename
    }

    tipe_kamar.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

});

app.delete('/:id', auth, async (req, res) => {
    let params = { id_tipe_kamar: req.params.id }
    //delete old file
    let delImg = await tipe_kamar.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto;
        let loc = path.join(__dirname, '../resource/usr/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }
    //delete data
    await tipe_kamar.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;