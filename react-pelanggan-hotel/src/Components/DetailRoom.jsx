import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const DetailRoom = () => {
    const [typeRoom, setTypeRoom] = useState([])
    const [check_in, setCheck_in] = useState('')
    const [check_out, setCheck_out] = useState('')
    const [totalRoom, setTotalRoom] = useState(0)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('check_in') && localStorage.getItem('check_out')) {
            setCheck_in(localStorage.getItem('check_in'))
            setCheck_out(localStorage.getItem('check_out'))
        }

        const getDataTypeRoom = async () => {
            await axios.get(`http://localhost:8000/hotel/tipe_kamar/${params.id}`, headerConfig())
                .then(res => setTypeRoom(res.data.data))
                .catch(err => console.log(err))
        };

        Promise.all([getDataTypeRoom()])

        return () => {
            setTypeRoom([])
        }
    }, [params.id])

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(Number(num));
    };

    const diffDays = (chck_in, chck_out) => {
        const checkIn = new Date(chck_in);
        const checkOut = new Date(chck_out);

        const diff = checkOut.getTime() - checkIn.getTime();
        const totalDays = Math.ceil(diff / (1000 * 3600 * 24));

        return totalDays;
    };

    const totalPrice = (
        chck_in,
        chck_out,
        totalRoom,
        price
    ) => {
        const total = diffDays(chck_in, chck_out) * totalRoom * price;

        return formatCurrency(total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            id_pelanggan: localStorage.getItem('user'),
            tgl_check_in: check_in,
            tgl_check_out: check_out,
            jumlah_kamar: totalRoom,
            id_tipe_kamar: params.id,
            status_pemesanan: 'baru',
            id_user: null
        }

        axios.post('http://localhost:8000/hotel/pemesanan', data, headerConfig())
            .then(res => {
                if (res.data.success === 1) {
                    localStorage.setItem('tipe_kamar', typeRoom[0].nama_tipe_kamar)
                    localStorage.setItem('jumlah_kamar', totalRoom)
                    localStorage.setItem('total_hari', diffDays(check_in, check_out))
                    localStorage.setItem('total_harga', totalPrice(check_in, check_out, totalRoom, typeRoom[0].harga))

                    setTimeout(() => {
                        navigate('/payment')
                    }, 2000)
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <section>
                {/* TypeRoom */}
                {typeRoom.map((a, i) => (
                    <section className="py-10 lg:py-10" key={i}>
                        <div className="max-w-7xl mx-auto">
                            <div className="container">
                                <div className="grid grid-cols-10 gap-5 px-4">
                                    <div className="col-span-10 lg:col-span-7">
                                        <div className="flex flex-col">
                                            <img
                                                src={`http://localhost:8000/room/${a.foto}` || ''}
                                                alt="Type Room Image"
                                                loading="lazy"
                                                className="lg:h-[500px] rounded-lg object-cover object-center"
                                            />

                                            <div className="py-5">
                                                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                                    Wikusama Hotel {a.nama_tipe_kamar}
                                                </h2>

                                                <p className="text-gray-500 text-sm">
                                                    Oleh Wikusama Hotel
                                                </p>

                                                <div className="flex items-end gap-2 my-4">
                                                    <p className="font-bold text-black text-3xl">
                                                        {formatCurrency(a.harga)}
                                                    </p>

                                                    <p className="text-gray-400 text-sm">/ malam</p>
                                                </div>

                                                <p
                                                    className="font-medium text-justify text-base text-gray-500 whitespace-no-wrap"
                                                >
                                                    {a.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="col-span-10 lg:col-span-3">
                                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                                            <h1 className="text-lg font-semibold border-b text-gray-500 border-gray-500 pb-2">
                                                Pesan Kamar
                                            </h1>

                                            <div className="border-b text-gray-500 border-gray-500 py-2">
                                                <div className="w-full flex justify-between gap-5">
                                                    <div className="w-full">
                                                        <h2 className="text-sm font-medium text-gray-500 pb-2">
                                                            Tgl Check In
                                                        </h2>

                                                        <input
                                                            type="date"
                                                            name="tgl_check_in"
                                                            id="tgl_check_in"
                                                            className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue/50 sm:text-sm mb-2"
                                                            required
                                                            value={check_in}
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="w-full">
                                                        <h2 className="text-sm font-medium text-gray-500 pb-2">
                                                            Tgl Check Out
                                                        </h2>

                                                        <input
                                                            type="date"
                                                            name="tgl_check_out"
                                                            id="tgl_check_out"
                                                            className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue/50 sm:text-sm mb-2"
                                                            required
                                                            value={check_out}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="py-2">
                                                    <h2 className="text-sm font-medium text-gray-500 pb-2">
                                                        Jumlah Kamar
                                                    </h2>

                                                    <input
                                                        type="number"
                                                        name="jumlah_kamar"
                                                        id="jumlah_kamar"
                                                        className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue/50 sm:text-sm mb-2"
                                                        placeholder="Masukkan Jumlah Kamar"
                                                        required
                                                        min={0}
                                                        max={5}
                                                        value={totalRoom}
                                                        onChange={(e) => setTotalRoom(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <h1 className="text-lg font-semibold text-gray-500 py-2">
                                                Rincian Pesanan
                                            </h1>

                                            <div className="bg-gray-200 text-gray-500 rounded-lg py-2">
                                                <div className="w-full flex items-center justify-between px-3 pb-1">
                                                    <h2 className="text-sm font-medium">Tipe Kamar</h2>

                                                    <p className="text-sm font-semibold text-black">
                                                        {a.nama_tipe_kamar}
                                                    </p>
                                                </div>

                                                <div className="w-full flex items-center justify-between px-3 pb-1">
                                                    <h2 className="text-sm font-medium">Jumlah Kamar</h2>

                                                    <p className="text-sm font-semibold text-black">
                                                        {totalRoom || 0}
                                                    </p>
                                                </div>

                                                <div className="w-full flex items-center justify-between px-3 pb-1">
                                                    <h2 className="text-sm font-medium">Total Hari</h2>

                                                    <p className="text-sm font-semibold text-black">
                                                        {diffDays(check_in, check_out)}
                                                    </p>
                                                </div>

                                                <div className="w-full flex items-center justify-between px-3 pb-1">
                                                    <h2 className="text-sm font-medium">Total Harga</h2>

                                                    <p className="text-sm font-semibold text-black">
                                                        {totalPrice(
                                                            check_in,
                                                            check_out,
                                                            totalRoom,
                                                            a.harga
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white w-full my-2 py-2 rounded-lg text-base font-medium"
                                            >
                                                Bayar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
                {/* TypeRoom End */}

                {/* Reviews */}
                <section className="py-8 lg:py-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="container">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-4">
                                <section>
                                    <div className="border rounded-lg p-4">
                                        <h2 className="text-gray-800 text-lg lg:text-xl font-bold mb-3">
                                            Penilaian Tentang Kamar Ini
                                        </h2>

                                        <div className="flex items-center gap-2 mb-0.5">
                                            <div className="flex gap-0.5 -ml-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 text-gray-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>

                                            <span className="text-sm font-semibold">4/5</span>
                                        </div>

                                        <span className="block text-gray-500 text-sm">Bases on 27 reviews</span>

                                        <div className="flex flex-col border-t border-b gap-2 py-5 my-5">
                                            <div className="flex items-center gap-3">
                                                <span className="w-10 text-gray-600 text-sm text-center whitespace-nowrap">
                                                    5
                                                </span>

                                                <div className="h-4 flex flex-1 bg-gray-200 overflow-hidden rounded">
                                                    <span className="w-3/4 h-full bg-yellow-400 rounded"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="w-10 text-gray-600 text-sm text-center whitespace-nowrap">
                                                    4
                                                </span>

                                                <div className="h-4 flex flex-1 bg-gray-200 overflow-hidden rounded">
                                                    <span className="w-1/2 h-full bg-yellow-400 rounded"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="w-10 text-gray-600 text-sm text-center whitespace-nowrap">
                                                    3
                                                </span>

                                                <div className="h-4 flex flex-1 bg-gray-200 overflow-hidden rounded">
                                                    <span className="w-2/6 h-full bg-yellow-400 rounded"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="w-10 text-gray-600 text-sm text-center whitespace-nowrap">
                                                    2
                                                </span>

                                                <div className="h-4 flex flex-1 bg-gray-200 overflow-hidden rounded">
                                                    <span className="w-1/6 h-full bg-yellow-400 rounded"></span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="w-10 text-gray-600 text-sm text-center whitespace-nowrap">
                                                    1
                                                </span>

                                                <div className="h-4 flex flex-1 bg-gray-200 overflow-hidden rounded"></div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="w-full block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3"
                                        >
                                            Tulis Ulasan
                                        </button>
                                    </div>
                                </section>

                                <div className="lg:col-span-2">
                                    <div className="border-b pb-4 md:pb-6">
                                        <h2 className="text-gray-800 text-lg lg:text-xl font-bold">
                                            Penilaian Teratas
                                        </h2>
                                    </div>

                                    <div className="divide-y">
                                        <div className="flex flex-col gap-3 py-4 md:py-8">
                                            <div>
                                                <span className="block text-sm font-bold">
                                                    John McCulling
                                                </span>
                                                <span className="block text-gray-500 text-sm">
                                                    August 28, 2022
                                                </span>
                                            </div>

                                            <div className="flex gap-0.5 -ml-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>

                                            <p className="text-gray-600">
                                                This is a section of some simple filler text, also known as
                                                placeholder text. It shares some characteristics of a real
                                                written text but is random or otherwise generated. It may be
                                                used to display a sample of fonts or generate text for
                                                testing.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 py-4 md:py-8">
                                            <div>
                                                <span className="block text-sm font-bold">Kate Berg</span>
                                                <span className="block text-gray-500 text-sm">
                                                    July 21, 2022
                                                </span>
                                            </div>

                                            <div className="flex gap-0.5 -ml-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>

                                            <p className="text-gray-600">
                                                This is a section of some simple filler text, also known as
                                                placeholder text. It shares some characteristics of a real
                                                written text but is random or otherwise generated. It may be
                                                used to display a sample of fonts or generate text for
                                                testing.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 py-4 md:py-8">
                                            <div>
                                                <span className="block text-sm font-bold">
                                                    Greg Jackson
                                                </span>
                                                <span className="block text-gray-500 text-sm">
                                                    March 16, 2022
                                                </span>
                                            </div>

                                            <div className="flex gap-0.5 -ml-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-gray-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-gray-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>

                                            <p className="text-gray-600">
                                                This is a section of some simple filler text, also known as
                                                placeholder text. It shares some characteristics of a real
                                                written text but is random or otherwise generated. It may be
                                                used to display a sample of fonts or generate text for
                                                testing.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <button
                                            type="button"
                                            className="flex items-center text-blue hover:text-bluedark active:text-blue font-semibold transition duration-100 gap-0.5"
                                        >
                                            Baca Semua
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Reviews End */}
            </section>
        </>
    )
}

export default DetailRoom