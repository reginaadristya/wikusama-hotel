const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const user = require('./routes/user');
const tipe_kamar = require('./routes/tipe_kamar');
const kamar = require('./routes/kamar');
const pemesanan = require('./routes/pemesanan');
const filter_kamar = require('./routes/filter_kamar');
const pelanggan = require('./routes/pelanggan');
const detail_pemesanan = require('./routes/detail_pemesanan');

app.use(cors());
app.use(express.static(path.join(__dirname, 'img')));
app.use('/hotel/user', user);
app.use('/hotel/tipe_kamar', tipe_kamar);
app.use('/hotel/kamar', kamar);
app.use('/hotel/pemesanan', pemesanan);
app.use('/hotel/filter', filter_kamar);
app.use('/hotel/pelanggan', pelanggan);
app.use('/hotel/detail_pemesanan', detail_pemesanan);

app.listen(8000, () => console.log('Server started on http://localhost:8000 🚀'));