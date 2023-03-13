import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const Kamar = () => {
    const [data, setData] = useState()

    const getData = () => {
        axios.get('http://localhost:8000/hotel/kamar', headerConfig())
            .then(res => {
                setData(res.data.data)
            })
    }

    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/hotel/kamar/${id}`, headerConfig())
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
                <a href="/kamar/add_kamar" className='px-5 py-4 bg-blue-500 text-white text-xl rounded-md'>Tambah Kamar</a>
            </div>
            <div className=" overflow-x-auto shadow-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nomor Kamar
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
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4 ">
                                    {item.nomor_kamar}
                                </td>
                                <td className="px-6 py-4">
                                    {item.tipe_kamar.nama_tipe_kamar}
                                </td>
                                <td className="px-6 py-4 ">
                                    <a href={`/kamar/edit_kamar/${item.id_kamar}`} className='text-blue-500 mr-3'>Edit</a>
                                    <button onClick={() => deleteData(item.id_kamar)} className='text-red-500'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Kamar