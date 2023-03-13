import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig';

const Payment = () => {
    const [isShow, setIsShow] = useState(false);
    const [paymentMethodName, setPaymentMethodName] = useState('');
    const [check_in, setCheck_in] = useState('');
    const [check_out, setCheck_out] = useState('');
    const [tipe_kamar, setTipe_kamar] = useState('');
    const [jumlah_kamar, setJumlah_kamar] = useState('');
    const [total_hari, setTotal_hari] = useState('');
    const [total_harga, setTotal_harga] = useState('');
    const [dataCustomer, setDataCustomer] = useState([]);

    const navigate = useNavigate();

    const paymentMethod = [
        {
            name: 'Transfer Bank',
            img: '/img/transfer.jpeg',
        },
        {
            name: 'Virtual Account (VA)',
            img: '/img/transfer.jpeg',
        },
        {
            name: 'Kartu Kredit',
            img: '/img/credit-card.webp',
        },
        {
            name: 'Debit Online',
            img: '/img/gpn.jpg',
        },
        {
            name: 'QRIS',
            img: '/img/qris.jpg',
        },
    ];

    useEffect(() => {
        setCheck_in(localStorage.getItem('check_in'));
        setCheck_out(localStorage.getItem('check_out'));
        setTipe_kamar(localStorage.getItem('tipe_kamar'));
        setJumlah_kamar(localStorage.getItem('jumlah_kamar'));
        setTotal_hari(localStorage.getItem('total_hari'));
        setTotal_harga(localStorage.getItem('total_harga'));

        const customer = localStorage.getItem('user');

        const getDataCustomer = async () => {
            await axios.get(`http://localhost:8000/hotel/pelanggan/${customer}`, headerConfig())
                .then((res) => setDataCustomer(res.data.data))
                .catch((err) => console.log(err))
        }

        Promise.all([getDataCustomer()])
    }, []);

    const handleButton = (e) => {
        const target = e.target;
        const name = target.textContent || target.alt;

        setIsShow(true);
        setPaymentMethodName(name);
    };

    const handlePayment = () => {
        localStorage.removeItem('check_in');
        localStorage.removeItem('check_out');
        localStorage.removeItem('tipe_kamar');
        localStorage.removeItem('jumlah_kamar');
        localStorage.removeItem('total_hari');
        localStorage.removeItem('total_harga');

        setCheck_in('');
        setCheck_out('');
        setTipe_kamar('');
        setJumlah_kamar('');
        setTotal_hari('');
        setTotal_harga('');

        navigate('/history');
    };

    return (
        <main className="py-20">
            <section className="py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="container">
                        <div className="grid grid-cols-8">
                            <section className="col-span-8 lg:col-span-5 mb-5 lg:mb-0">
                                <div className="w-full px-4">
                                    <div className="border border-blue-500 bg-blue-500 text-white p-5 rounded-t-lg">
                                        <h1>Pilih Metode Pembayaran</h1>
                                    </div>

                                    {paymentMethod?.map((a, i) => (
                                        <button
                                            onClick={(e) => handleButton(e)}
                                            id={a.name}
                                            className="w-full border"
                                            key={i}
                                        >
                                            <div className="flex flex-wrap items-center justify-between p-5">
                                                <h3>{a.name}</h3>

                                                <div className="max-w-[150px]">
                                                    <img
                                                        src={a.img}
                                                        alt={a.name}
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {isShow === true ? (
                                <section className="col-span-8 lg:col-span-3">
                                    <div className="w-full px-4">
                                        <div className="border border-blue-500 bg-blue-500 text-white p-5 rounded-t-lg">
                                            <h1>Detail Pemesanan</h1>
                                        </div>

                                        <div className="border">
                                            <div className="flex flex-wrap items-center justify-between px-5 pt-5">
                                                <h3>Nama Pemesan</h3>

                                                <p>{dataCustomer.nama_pelanggan}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Email Pemesan</h3>

                                                <p>{dataCustomer.email}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Tanggal Check-in</h3>

                                                <p>{check_in}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Tanggal Check-out</h3>

                                                <p>{check_out}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Tipe Kamar</h3>

                                                <p>{tipe_kamar}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Jumlah Kamar</h3>

                                                <p>{jumlah_kamar}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 py-3">
                                                <h3>Total Hari</h3>

                                                <p>{total_hari}</p>
                                            </div>

                                            <hr className="my-2" />

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3">
                                                <h3>Total Harga</h3>

                                                <p>{total_harga}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between px-5 pt-3 pb-5">
                                                <h3>Bayar Menggunakan</h3>

                                                <p>{paymentMethodName}</p>
                                            </div>
                                        </div>

                                        <div className="my-4">
                                            <button
                                                type="button"
                                                onClick={handlePayment}
                                                className="bg-blue-500 hover:bg-blue-500 text-white w-full py-2 rounded-lg text-base font-medium"
                                            >
                                                Bayar
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Payment