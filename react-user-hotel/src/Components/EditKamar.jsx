import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { headerConfig } from '../lib/headerConfig'

const EditKamar = () => {
    const [nomorKamar, setNomorKamar] = useState()
    const [tipeKamar, setTipeKamar] = useState()
    const [tipeKamarList, setTipeKamarList] = useState([])

    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            nomor_kamar: nomorKamar,
            id_tipe_kamar: tipeKamar
        }
        
        axios.put(`http://localhost:8000/hotel/kamar/${params.id}`, data, headerConfig())
            .then(res => {
                navigate('/kamar')
            })
    }

    const getTipekamar = () => {
        axios.get('http://localhost:8000/hotel/tipe_kamar/', headerConfig())
            .then(res => {
                setTipeKamarList(res.data.tipe_kamar)
            })
    }
    const getkamar = () => {
        axios.get(`http://localhost:8000/hotel/kamar/${params.id}`, headerConfig())
            .then(res => {
                setNomorKamar(res.data.data.nomor_kamar)
                setTipeKamar(res.data.data.id_tipe_kamar)
            })
    }

    useEffect(() => {
        getTipekamar()
        getkamar()
    }, [])

    return (
        <div className='w-full  p-5'>
            <form className="w-full " onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Nomor Kamar
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value={nomorKamar} onChange={(e) => setNomorKamar(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Tipe Kamar
                        </label>
                        {tipeKamarList.map((item, i) => (
                            <select name="tipeKamar" id="tipeKAmar" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={tipeKamar} onChange={(e) => setTipeKamar(e.target.value)} key={i}>
                                <option selected>pilih tipe kamar</option>
                                <option value={item.id_tipe_kamar}>{item.nama_tipe_kamar}</option>
                            </select>
                        ))}
                    </div>
                </div>
                <button type='submit' className='bg-blue-500 px-5 py-2 text-white rounded-lg'>save</button>
            </form>
        </div>
    )
}

export default EditKamar