import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const TipeKamar = () => {
    const [data, setData] = useState()

    const getData = () => {
        axios.get('http://localhost:8000/hotel/tipe_kamar', headerConfig())
            .then(res => {
                setData(res.data.tipe_kamar)
            })
    }

    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/hotel/tipe_kamar/${id}`, headerConfig())
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
            <div className=' py-5'>
                <a href="/tipe_kamar/add_tipe_kamar" className='px-5 py-4 bg-blue-500 text-white text-xl rounded-md'>Tambah Tipe Kamar</a>
            </div>
            <div className=" overflow-x-auto shadow-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Tipe Kamar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Deskripsi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4 ">
                                    {item.nama_tipe_kamar}
                                </td>
                                <td className="px-6 py-4">
                                    {item.harga}
                                </td>
                                <td className="px-6 py-4">
                                    {item.deskripsi}
                                </td>
                                <td className="px-6 py-4 ">
                                    <a href={`/tipe_kamar/edit_tipe_kamar/${item.id_tipe_kamar}`} className='text-blue-500 mr-3'>Edit</a>
                                    <button onClick={() => deleteData(item.id_tipe_kamar)} className='text-red-500'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TipeKamar