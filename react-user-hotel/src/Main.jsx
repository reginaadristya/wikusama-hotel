import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "./Common/Navbar";
import AddKamarPage from "./Pages/AddKamarPage";
import AddTipeKamarPage from "./Pages/AddTipeKamarPage";
import AddUserPage from "./Pages/AddUserPage";
import EditKamarPage from "./Pages/EditKamarPage";
import EditTipeKamarPage from "./Pages/EditTipeKamarPage";
import EditUserPage from "./Pages/EditUserPage";
import KamarPage from "./Pages/KamarPage";
import PemesananPage from "./Pages/PemesananPage";
import TipeKamarPage from "./Pages/TipeKamarPage";
import UserPage from "./Pages/UserPage";

function Main() {
    let navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <Navbar>
                <Routes>
                    {localStorage.getItem("role") === 'admin' ? <Route path='/tipe_kamar' element={<TipeKamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/tipe_kamar/add_tipe_kamar' element={<AddTipeKamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/tipe_kamar/edit_tipe_kamar/:id' element={<EditTipeKamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/kamar' element={<KamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/kamar/add_kamar' element={<AddKamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/kamar/edit_kamar/:id' element={<EditKamarPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/users' element={<UserPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/users/add_user' element={<AddUserPage />}></Route> : ""}
                    {localStorage.getItem("role") === 'admin' ? <Route path='/users/edit_user/:id' element={<EditUserPage />}></Route> : ""}

                    {localStorage.getItem("role") === 'resepsionis' ? <Route path='/pemesanan' element={<PemesananPage />}></Route> : ""}
                </Routes>
            </Navbar>
        </div>
    );
}

export default Main;
