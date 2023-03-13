import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const EditUser = () => {
    const [nama, setNama] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [foto, setFoto] = useState()
    const [role, setRole] = useState()

    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("nama_user", nama)
        data.append('email', email)
        data.append('password', password)
        data.append('foto', foto)
        data.append('role', role)

        axios.put(`http://localhost:8000/hotel/user/${params.id}`, data, headerConfig())
            .then(res => {
                navigate('/users')
            })
    }

    const getUser = () => {
        axios.get(`http://localhost:8000/hotel/user/${params.id}`, headerConfig())
            .then(res => {
                setNama(res.data.data.nama_user)
                setEmail(res.data.data.email)
                setRole(res.data.data.role)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='w-full  p-5'>
            <form className="w-full " onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Nama
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={nama} onChange={(e) => setNama(e.target.value)} accept="image/*" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Pasword
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                            Role
                        </label>
                        <select name="role" id="role" className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            value={role} onChange={(e) => setRole(e.target.value)}>
                            <option selected >pilih role</option>
                            <option value="admin">admin</option>
                            <option value="resepsionis">resepsionis</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className='bg-blue-500 px-5 py-2 text-white rounded-lg'>save</button>
            </form>
        </div>
    )
}

export default EditUser