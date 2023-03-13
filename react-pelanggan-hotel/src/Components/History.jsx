import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment/moment'

import { headerConfig } from '../lib/headerConfig'

const History = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const customer = localStorage.getItem('user')

        const getData = async () => {
            await axios.get(`http://localhost:8000/hotel/pemesanan/pelanggan/${customer}`, headerConfig())
                .then((res) => setData(res.data.data))
                .catch((err) => console.log(err))
        };

        Promise.all([getData()])
    }, [])

    const formatLocalTime = (time) => {
        const date = new Date(time);
        return `${date.getDate()}/${Number(date.getMonth()) + 1
            }/${date.getFullYear()}`;
    };

    return (
        <div className='p-5'>
            <div className='py-5'>
                <a href="/dashboard" className='px-5 py-4 bg-blue-500 text-white text-xl rounded-md'>Pesan Kamar</a>
            </div>

            {!data.length ? (
                <p>loading...</p>
            ) : (
                data.map((item, index) => (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nomor Pemesanan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama pemesan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email Pemesan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Pemesanan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Check In
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Check Out
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Jumlah Kamar
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tipe Kamar
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item, i) => (
                                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.nomor_pemesanan}
                                        </th>
                                        <td className="px-6 py-4 ">
                                            {item.pelanggan.nama_pelanggan}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.pelanggan.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.tgl_pemesanan).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.tgl_check_in).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(item.tgl_check_out).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.jumlah_kamar}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.tipe_kamar.nama_tipe_kamar}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.status_pemesanan}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <NavLink to={`/detail-booking/${item.id_pemesanan}`} className='bg-blue-500 text-white rounded-md px-5 py 2'>Detail</NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    )
}

export default History