import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment/moment'

import { headerConfig } from '../lib/headerConfig'

const Pemesanan = () => {
    const [data, setData] = useState()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [status, setStatus] = useState()

    function handleOpen(id, status) {
        setOpen(!open)
        setId(id)
        setStatus(status)
    }

    const getData = () => {
        axios.get('http://localhost:8000/hotel/pemesanan', headerConfig())
            .then(res => {
                setData(res.data.pemesanan)
            })
    }

    const updatePemesanan = (e) => {
        e.preventDefault()

        const user = localStorage.getItem("user")

        const data = {
            status_pemesanan: status,
            id_user: user
        }

        axios.put(`http://localhost:8000/hotel/pemesanan/${id}`, data, headerConfig())
            .then(res => {
                setOpen(!open)
                window.location.reload()
            })
    }

    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/hotel/pemesanan/${id}`, headerConfig())
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='p-5'>
            {
                open ? <div className='overflow-x-hidden h-screen w-full absolute flex items-center justify-center'>
                    <div className='h-screen w-full bg-black absolute z-[1] opacity-40' />
                    <div className='z-[2] absolute bg-white px-10 py-5 rounded-md'>
                        <form action="" className='flex gap-5' onSubmit={updatePemesanan}>
                            <select name="status" id="status" className='px-5 py-3 rounded-lg bg-gray-200' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="baru">Baru</option>
                                <option value="check_in">Check In</option>
                                <option value="check_out">Check Out</option>
                            </select>
                            <button type='submit' className='px-5 py-2 bg-blue-500 text-white rounded-md'>Save</button>
                        </form>
                    </div>
                </div> : <div></div>
            }

            <div className=" overflow-x-auto shadow-md">
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
                                <td className="px-6 py-4 ">
                                    <button onClick={() => handleOpen(item.id_pemesanan, item.status_pemesanan)} name="status" id="status" className='bg-blue-500 text-white rounded-md px-5 py 2'>{item.status_pemesanan}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Pemesanan