import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment/moment'

import { headerConfig } from '../lib/headerConfig'

const DetailBooking = () => {
    const [data, setData] = useState([])
    const [dataDetail, setDataDetail] = useState([])

    const params = useParams()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8000/hotel/pemesanan/${params.id}`, headerConfig())
                .then((res) => setData(res.data.data))
                .catch((err) => console.log(err))
        };

        const getDataById = async () => {
            await axios.get(`http://localhost:8000/hotel/detail_pemesanan/${params.id}`, headerConfig())
                .then((res) => setDataDetail(res.data.pemesanan))
                .catch((err) => console.log(err))
        };

        Promise.all([getData(), getDataById()])
    }, [])

    return (
        <div>
            <main className="bg-white min-h-screen">
                <section className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-10 pt-10">
                            <h2 className="text-2xl font-bold capitalize">
                                Detail Pemesanan
                            </h2>
                        </div>

                        <div className="w-full p-10">
                            <div className="w-full">
                                <div className="border-gray-300 bg-white border-solid border-2 rounded-lg px-5">
                                    <div className="mt-3">
                                        <h1 className="text-xl font-bold border-b-2 border-solid border-gray-300 pb-3">
                                            Rincian Pesanan
                                        </h1>

                                        <div className="w-full lg:flex justify-between gap-5 py-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nomor Pemesanan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-500/50 sm:text-sm"
                                                    type="text"
                                                    value={data?.nomor_pemesanan || 'Tidak Diketahui'}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nama Tipe Kamar
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-500/50 sm:text-sm"
                                                    type="text"
                                                    value={
                                                        data?.tipe_kamar?.nama_tipe_kamar ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Nama Pemesan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-500/50 sm:text-sm"
                                                    type="text"
                                                    value={data?.pelanggan?.nama_pelanggan || 'Tidak Diketahui'}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-lg font-medium text-gray-500">
                                                    Email Pemesan
                                                </h2>

                                                <input
                                                    disabled
                                                    className="block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-500/50 sm:text-sm"
                                                    type="email"
                                                    value={data?.pelanggan?.email || 'Tidak Diketahui'}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between gap-5 pb-5">
                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Pemesanan
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full"
                                                    value={
                                                        moment(data.tgl_pemesanan).format('YYYY-MM-DD') ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Check In
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full"
                                                    value={
                                                        moment(data.tgl_check_in).format('YYYY-MM-DD') ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <h2 className="mb-2 text-sm lg:text-lg font-medium text-gray-500">
                                                    Tgl Check Out
                                                </h2>

                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full"
                                                    value={
                                                        moment(data.tgl_check_out).format('YYYY-MM-DD') ||
                                                        'Tidak Diketahui'
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 w-full flex justify-between items-center">
                                            <h1 className="text-xl font-medium">Cetak Invoice</h1>

                                            <NavLink
                                                to={`/detail-booking/${params.id}/invoice`}
                                                className="bg-blue-500 text-white font-medium px-3 py-2 rounded-lg"
                                            >
                                                Cetak Invoice
                                            </NavLink>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left text-gray-500 my-5">
                                                <thead className="text-xs text-white uppercase bg-blue-500">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            No Kamar
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Nama Tipe Kamar
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Tgl Check In
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Tgl Check Out
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {!dataDetail?.length ? (
                                                        <tr>
                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                <div className="flex items-center select-none">
                                                                    <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                        this text will not displayed
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        dataDetail?.map((a, i) => (
                                                            <tr key={i} className="bg-gray-500">
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {a.kamar?.nomor_kamar}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {data?.tipe_kamar?.nama_tipe_kamar}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {moment(data?.tgl_check_in).format('YYYY-MM-DD')}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {moment(data?.tgl_check_out).format('YYYY-MM-DD')}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default DetailBooking