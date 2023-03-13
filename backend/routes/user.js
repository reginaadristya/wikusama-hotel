const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const SECRET_KEY = 'secretkkey';

const auth = require('../middleware/auth');
const { uploadUser } = require('../middleware/uploadImage');
const user = require('../models/index').user;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await user.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
    let params = { id_user: req.params.id };

    await user.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.post('/', auth, uploadUser.single('foto'), async (req, res) => {
    if (!req.file) return res.json({ message: 'File not found' });

    let data = {
        nama_user: req.body.nama_user,
        foto: req.file.filename,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    await user.create(data)
        .then(result => res.json({ message: 'Data has been inserted', data: result }))
        .catch(error => res.json({ message: error.message }));
})

app.put('/:id', auth, uploadUser.single('foto'), async (req, res) => {

    let params = { id_user: req.params.id }
    let data = {
        nama_user: req.body.nama_user,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    if (req.file) {
        // get data by id
        user.findOne({ where: params })
            .then(result => {
                let oldFileName = result.foto

                // delete old file
                let dir = path.join(__dirname, "../img/usr", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(error => {
                console.log(error.message);
            })

        // set new filename
        data.foto = req.file.filename
    }

    user.update(data, { where: params })
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
    let params = { id_user: req.params.id }
    //delete old file
    let delImg = await user.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto;
        let loc = path.join(__dirname, '../resource/usr/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }
    //delete data
    await user.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

//login admin
app.post('/login', async (req, res) => {
    let params = {
        email: req.body.email,
        password: md5(req.body.password),
    }

    await user.findOne({ where: params })
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