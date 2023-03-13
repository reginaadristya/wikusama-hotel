const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const SECRET_KEY = 'secretkkey';

const auth = require('../middleware/auth');
const pelanggan = require('../models/index').pelanggan;
const { uploadUser } = require('../middleware/uploadImage');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await pelanggan.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
    let params = { id_pelanggan: req.params.id };

    await pelanggan.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.post('/', uploadUser.single('foto'), async (req, res) => {
    if (!req.file) return res.json({ message: 'File not found' });

    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        foto: req.file.filename,
        email: req.body.email,
        password: md5(req.body.password)
    }

    await pelanggan.create(data)
        .then(result => res.json({ message: 'Data has been inserted', data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.put('/', auth, uploadUser.single('foto'), async (req, res) => {
    if (!req.file) return res.json({ message: 'File not found' });

    let params = { id_pelanggan: req.body.id_pelanggan }
    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        foto: req.file.filename,
        email: req.body.email,
        password: md5(req.body.password)
    }

    if (req.file) {
        //get data by id
        let oldImg = await pelanggan.findOne({ where: params });
        let oldImgName = oldImg.foto;
        //delete old file
        let loc = path.join(__dirname, '../resource/usr/', oldImgName);
        fs.unlink(loc, (err) => console.log(err));
        //set new file
        data.foto = req.file.filename;
    }

    await pelanggan.update(data, { where: params })
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

app.delete('/:id', auth, async (req, res) => {
    let params = { id_pelanggan: req.params.id }
    //delete old file
    let delImg = await pelanggan.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto;
        let loc = path.join(__dirname, '../resource/usr/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }
    //delete data
    await pelanggan.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

//login pelanggan
app.post('/login', async (req, res) => {
    let params = {
        email: req.body.email,
        password: md5(req.body.password),
    }

    await pelanggan.findOne({ where: params })
        .then(result => {
            if (result) {
                let payload = JSON.stringify(result);
                let token = jwt.sign(payload, SECRET_KEY);
                res.json({ success: 1, message: "Login success, welcome back!", data: result, token: token })
            } else {
                res.json({ success: 0, message: "Invalid email or password!" })
            }
        })
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;