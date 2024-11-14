import Header from "../components/Header";
import HC1 from "../assets/HC1.jpg"
import { useParams } from "react-router-dom";
import {
    Typography,
    CardFooter,
    Button,
    IconButton,
    Chip
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { getAppointmentHistory, UpdateAppointment } from "../service/userService";
import { format } from 'date-fns';
const FindHospital = () => {
    const [history, setHistory] = useState([])
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAppointmentHistory(params.user_id)
            console.log(data.data)
            setHistory(data.data)
        }
        fetchData()
    }, []);

    // const handleCancel = async (index) => {
    //     console.log("12312312312");
    //     const data = {
    //         status: "Canceled",
    //         date: history[index].date,
    //         time: history[index].time,
    //         id: history[index].id,
    //     }
    //     console.log(data)
    //     await UpdateAppointment(data);
    //     console.log("xong goi");
    // }
    return (
        <>
            <Header role='user' />
            <div className="relative flex flex-col h-[calc(100vh-70px)] w-full">
                <div className="pt-5 grid card bg-base-300 rounded-box place-items-center">
                    <Typography variant="h2">MY APPOINTMENTS</Typography>
                    <form class="pt-5 flex items-center w-1/2 mx-auto">
                        <label for="voice-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                </svg>
                            </div>
                            <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                            <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                </svg>
                            </button>
                        </div>
                        <button type="submit" class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>Search
                        </button>
                    </form>
                </div>
                <div className="pt-10 px-36 w-screen card bg-base-300 rounded-box place-items-center">
                    <div className="overflow-hidden">
                        <table class="min-w-full">
                            <thead class="bg-gray-100 border-2">
                                <tr>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Time
                                    </th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Location
                                    </th>
                                    <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                    {/* <th scope="col" class="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                        Button
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {history && history.map((item, index) => (
                                    <tr class="bg-white border even:bg-blue-gray-50/50">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.user.name}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.time}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {format(new Date(item.date), 'dd/MM/yyyy')}
                                        </td>
                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.department.name + ", " + item.department.hospital.name}
                                        </td>
                                        <td class="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={item.status}
                                                    color={
                                                        item.status === "Booked"
                                                            ? "green"
                                                            : "red"
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <CardFooter className="flex absolute inset-x-0 bottom-0 place-items-center border-blue-gray-50 px-36 py-10">
                    <div className="flex items-center gap-8 ml-[32vw]">
                        <IconButton
                            size="sm"
                            variant="outlined"
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton>
                        <Typography color="gray" className="font-normal">
                            Page <strong className="text-gray-900"> 1 </strong> of{" "}
                            <strong className="text-gray-900">1</strong>
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="outlined"
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton>
                    </div>
                </CardFooter>
            </div >

        </>
    );
}

export default FindHospital