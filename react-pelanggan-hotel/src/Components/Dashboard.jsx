import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHotel, FaSearch } from 'react-icons/fa'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const Dasboard = () => {
    const [dataRooms, setDataRooms] = useState()
    const [check_in, setCheck_in] = useState()
    const [check_out, setCheck_out] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            tgl_check_in: check_in,
            tgl_check_out: check_out
        }

        axios.post("http://localhost:8000/hotel/filter", data, headerConfig())
            .then(res => {
                localStorage.setItem('check_in', check_in)
                localStorage.setItem('check_out', check_out)
                setDataRooms(res.data.room)
            })
            .catch(err => console.log(err))
    }

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(Number(num));
    };

    return (
        <>
            <section className="py-10 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="container">
                        <div className="w-full px-4">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-gray-100 rounded-lg"
                            >
                                <div className="py-5 md:flex md:justify-between px-4">
                                    <div className="flex items-center">
                                        <FaHotel className="text-primary text-2xl mr-2" />

                                        <h2 className="text-xl font-semibold lg:text-2xl">
                                            Temukan Kamar Disini
                                        </h2>
                                    </div>
                                </div>

                                <div className="w-full mb-5 gap-5 flex flex-col lg:flex-row items-center justify-between py-5 px-4">
                                    <div className="w-full">
                                        <label
                                            htmlFor="tgl_check_in"
                                            className="block text-lg font-medium text-gray-500 mb-2"
                                        >
                                            Tanggal Check In
                                        </label>

                                        <input
                                            type="date"
                                            name="tgl_check_in"
                                            id="tgl_check_in"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm"
                                            required
                                            value={check_in || ''}
                                            onChange={(e) =>
                                                setCheck_in(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="tgl_check_out"
                                            className="block text-lg font-medium text-gray-500 mb-2"
                                        >
                                            Tanggal Check Out
                                        </label>

                                        <input
                                            type="date"
                                            name="tgl_check_out"
                                            id="tgl_check_out"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm"
                                            required
                                            value={check_out || ''}
                                            onChange={(e) =>
                                                setCheck_out(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-5 px-4 border-t-2 border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full ring-2 ring-orange-500">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full" />
                                        </div>

                                        <p className="w-60 lg:w-full">
                                            Hubungi Layanan Pelanggan Untuk Keperluan Bantuan
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center bg-blue-500 hover:bg-primary dark active:bg-primary focus-visible:ring ring-primary text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-5 py-3"
                                        >
                                            <FaSearch className="mr-2 mt-1 text-sm" />
                                            Cari Kamar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {
                dataRooms?.length > 0 ? (
                    <section className="py-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="container">
                                <div className="w-full px-4">
                                    <div className="grid grid-cols-12 gap-5">
                                        {dataRooms?.map((a, i) => (
                                            <div className="col-span-12 lg:col-span-3" key={i}>
                                                <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg hover:-translate-y-2 transition-all ease-in-out duration-300">
                                                    <NavLink
                                                        to={`/details/${a.id_tipe_kamar}`}
                                                    >
                                                        <img
                                                            className="w-full h-[200px] object-cover object-center"
                                                            src={`http://localhost:8000/room/${a.foto}` || ''}
                                                            loading="lazy"
                                                            alt={a.nama_tipe_kamar}
                                                        />
                                                    </NavLink>

                                                    <div className="px-6 py-4">
                                                        <NavLink
                                                            to={`/details/${a.id_tipe_kamar}`}
                                                        >
                                                            {a.nama_tipe_kamar}
                                                        </NavLink>

                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: a.deskripsi.substring(0, 25) + '...',
                                                            }}
                                                            className="font-normal text-base text-gray-500 whitespace-no-wrap mt-2"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between px-6 pb-4">
                                                        <p className="font-semibold text-lg text-gray-500">
                                                            {formatCurrency(a.harga)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="py-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="container">
                                <div className="w-full px-4">
                                    <h1 className="block text-lg font-medium text-gray-500">
                                        Silahkan pilih tanggal terlebih dahulu!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Dasboard