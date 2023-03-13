import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { BiPrinter } from 'react-icons/bi'
import axios from 'axios'
import moment from 'moment/moment'

import { headerConfig } from '../lib/headerConfig'

const Invoice = () => {
    const [data, setData] = useState([])
    const [dataDetail, setDataDetail] = useState([])

    const params = useParams()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8000/hotel/pemesanan/${params.id}`, headerConfig())
                .then((res) => setData(res.data.data))
                .catch((err) => console.log(err))
        };

        const getDataById = async () => {
            await axios.get(`http://localhost:8000/hotel/detail_pemesanan/${params.id}`, headerConfig())
                .then((res) => setDataDetail(res.data.pemesanan))
                .catch((err) => console.log(err))
        };

        Promise.all([getData(), getDataById()])
    }, [])

    const componentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentsRef?.current,
    });

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(Number(num));
      };

    const diffDays = (chck_in, chck_out) => {
        const checkIn = new Date(chck_in);
        const checkOut = new Date(chck_out);

        const diff = checkOut.getTime() - checkIn.getTime();
        const totalDays = Math.ceil(diff / (1000 * 3600 * 24));

        return totalDays;
    };

    const totalPrice = (
        chck_in,
        chck_out,
        totalRoom,
        price
    ) => {
        const total = diffDays(chck_in, chck_out) * totalRoom * price;

        return formatCurrency(total);
    };

    const subTotal = (totalRoom, price) => {
        return formatCurrency(totalRoom * price);
    };

    return (
        <div>
            <main className="min-h-screen">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex items-center justify-center">
                                <button
                                    onClick={handlePrint}
                                    className="fixed bg-blue-500 text-white right-4 bottom-4 p-3 rounded-full"
                                >
                                    <BiPrinter className="text-3xl " />
                                </button>
                            </div>

                            <div ref={componentsRef} className="print:shadow-none shadow-lg">
                                <section>
                                    <div className="print:py-0 py-16">
                                        <div className="rounded-b-md">
                                            <div className="p-9">
                                                <div className="space-y-6 text-slate-700">
                                                    <NavLink href="/" legacyBehavior>
                                                        <a
                                                            className="inline-flex items-center gap-2 font-bold text-xl lg:text-2xl py-6"
                                                            aria-label="logo"
                                                        >
                                                            Wikusama Hotel
                                                        </a>
                                                    </NavLink>
                                                </div>
                                            </div>

                                            <div className="p-9">
                                                <div className="flex w-full">
                                                    <div className="grid grid-cols-4 gap-12">
                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Detail Invoice
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                Jl. Raden Panji Suroso No.7, Purwodadi, Kec.
                                                                Blimbing, Kota Malang, Jawa Timur 65126
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Diberikan Kepada
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {`${data?.pelanggan?.nama_pelanggan}, ${data?.pelanggan?.email}`}
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="text-sm font-normal text-slate-700">
                                                                Nomor Pemesanan
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {data?.nomor_pemesanan || 'Tidak Diketahui'}
                                                            </p>
                                                        </div>

                                                        <div className="col-span-4 lg:col-span-1 print:col-span-1">
                                                            <p className="mt-2 text-sm font-normal text-slate-700">
                                                                Tanggal Pemesanan
                                                            </p>

                                                            <p className="text-sm font-light text-slate-500">
                                                                {moment(data.tgl_pemesanan).format('YYYY-MM-DD') ||
                                                                    'Tidak Diketahui'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-9 overflow-x-auto">
                                                <div className="flex flex-col mx-0 mt-8">
                                                    <table className="w-full divide-y divide-slate-500">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Nomor Kamar
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tipe Kamar
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tgl Check-in
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Tgl Check-out
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell"
                                                                >
                                                                    Harga
                                                                </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {!dataDetail?.length ? (
                                                                <tr>
                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td className="animate-pulse transition-all ease-in-out duration-300 bg-gray-100 px-5 py-5 border-b border-gray-200 text-sm">
                                                                        <div className="flex items-center select-none">
                                                                            <div className="bg-gray-200 text-gray-200 whitespace-no-wrap">
                                                                                this text will not displayed
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                dataDetail?.map((a, i) => (
                                                                    <tr
                                                                        key={i}
                                                                        className="border-b border-slate-200"
                                                                    >
                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {a.kamar?.nomor_kamar}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {data?.tipe_kamar?.nama_tipe_kamar}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {moment(data.tgl_check_in).format('YYYY-MM-DD')}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {moment(data.tgl_check_out).format('YYYY-MM-DD')}
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {formatCurrency(
                                                                                        data?.tipe_kamar?.harga
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>

                                                        <tfoot>
                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Subtotal
                                                                </th>

                                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {subTotal(
                                                                        data?.jumlah_kamar,
                                                                        data?.tipe_kamar?.harga
                                                                    ) || 'Tidak Diketahui'}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Total Kamar
                                                                </th>

                                                                <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {data?.jumlah_kamar || 'Tidak Diketahui'}{' '}
                                                                    Kamar
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                                                >
                                                                    Lama Menginap
                                                                </th>

                                                                <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                                    {diffDays(
                                                                        data?.tgl_check_in,
                                                                        data?.tgl_check_out
                                                                    ) || 'Tidak Diketahui'}{' '}
                                                                    Hari
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    colSpan={4}
                                                                    className="pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                                                                >
                                                                    Total
                                                                </th>

                                                                <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                                                                    {totalPrice(
                                                                        data?.tgl_check_in,
                                                                        data?.tgl_check_out,
                                                                        data?.jumlah_kamar,
                                                                        data?.tipe_kamar?.harga
                                                                    ) || 'Tidak Diketahui'}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="px-9">
                                                <div className="border-t py-9 border-slate-200">
                                                    <div className="text-sm text-justify font-light text-slate-700 ">
                                                        <p>
                                                            Jangka waktu pembayaran adalah 14 hari. Perlu
                                                            diketahui bahwa menurut Undang-Undang Pembayaran
                                                            Utang Terlambat 0000, pekerja lepas berhak untuk
                                                            mengklaim biaya keterlambatan 00.00 setelah tidak
                                                            membayar utang setelah waktu ini, di mana faktur
                                                            baru akan diajukan dengan tambahan biaya ini. Jika
                                                            pembayaran tagihan yang telah direvisi tidak
                                                            diterima dalam 14 hari berikutnya, bunga tambahan
                                                            akan dibebankan ke rekening yang telah jatuh tempo
                                                            dan tingkat wajib sebesar 8% ditambah dasar Bank
                                                            of England sebesar 0,5%, dengan total 8,5%. Para
                                                            pihak tidak dapat membuat kontrak di luar
                                                            ketentuan Undang-undang.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Invoice