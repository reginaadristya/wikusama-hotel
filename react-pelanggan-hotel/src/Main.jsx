import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "./Common/Navbar";
import DashboardPage from "./Pages/DashboardPage";
import DetailBookingPage from "./Pages/DetailBookingPage";
import DetailRoomPage from "./Pages/DetailRoomPage";
import HistoryPage from "./Pages/HistoryPage";
import InvoicePage from "./Pages/InvoicePage";
import PaymentPage from "./Pages/PaymentPage";

const Main = () => {
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
                    <Route path='/dashboard' element={<DashboardPage />}></Route>
                    <Route path='/details/:id' element={<DetailRoomPage />}></Route>
                    <Route path='/payment' element={<PaymentPage />}></Route>
                    <Route path='/history' element={<HistoryPage />}></Route>
                    <Route path='/detail-booking/:id' element={<DetailBookingPage />}></Route>
                    <Route path='/detail-booking/:id/invoice' element={<InvoicePage />}></Route>
                </Routes>
            </Navbar>
        </div>
    )
}

export default Main