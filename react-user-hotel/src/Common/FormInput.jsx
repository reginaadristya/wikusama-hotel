import React, { useState } from 'react'
import axios from 'axios'

import { headerConfig } from '../lib/headerConfig'

const FormInput = (id) => {
    const [status, setStatus] = useState()
    const [user, setUser] = useState()

    const updtStatus = () => {
        const data = {
            status: status,
            id_user: user
        }

        axios.put(`http://localhost:8000/hotel/pemesanan/${id}`, data, headerConfig())
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div className='h-screen w-full  absolute flex items-center justify-center '>
            <div className='h-screen w-full bg-black absolute z-[1] opacity-40' />
            <div className='z-[2] absolute bg-white px-10 py-5 rounded-md'>
                <form action="" className='flex gap-5'>
                    <select name="status" id="status" className=' px-5 py-3 rounded-lg bg-gray-200'>
                        <option value="">asdasd</option>
                        <option value="">asdasd</option>
                        <option value="">asdasd</option>
                    </select>
                    <button type='submit' className='px-5 py-2 bg-blue-500 text-white rounded-md'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default FormInput