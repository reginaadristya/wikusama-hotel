import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const EditTipeKamar = () => {
    const [namaTipeKamar, setNamaTipeKamar] = useState()
    const [harga, setHarga] = useState()
    const [foto, setFoto] = useState()
    const [deskripsi, setDeskripsi] = useState()

    const params = useParams()
    const navigate = useNavigate()

    const getData = () => {
        axios.get(`http://localhost:8000/hotel/tipe_kamar/${params.id}`, headerConfig())
            .then(res => {
                setNamaTipeKamar(res.data.data[0].nama_tipe_kamar)
                setHarga(res.data.data[0].harga)
                setDeskripsi(res.data.data[0].deskripsi)
                console.log(res.data.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("nama_tipe_kamar", namaTipeKamar)
        data.append('harga', harga)
        data.append('foto', foto)
        data.append('deskripsi', deskripsi)

        axios.put(`http://localhost:8000/hotel/tipe_kamar/${params.id}`, data, headerConfig())
            .then(res => {
                navigate('/tipe_kamar')
            })
    }

    return (
        <div className='w-full  p-5'>
            <form className="w-full " onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Nama Tipe Kamar
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value={namaTipeKamar} onChange={(e) => setNamaTipeKamar(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Harga
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Foto
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="file"
                            onChange={(e) => setFoto(e.target.files[0])} accept="image/*" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Deskripsi
                        </label>
                        <textarea name="deskripsi" id="deskripsi" cols="30" rows="10" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    </div>
                </div>
                <button type='submit' className='bg-blue-500 px-5 py-2 text-white rounded-lg'>save</button>
            </form>
        </div>
    )
}

export default EditTipeKamar