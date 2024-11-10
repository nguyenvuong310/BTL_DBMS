import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GGM from "../assets/GGM.jpg"
import {
    Typography,
} from "@material-tailwind/react";
import { getSymptom, getDepartmentBySymptom, createNewAppointment } from "../service/userService";
import { getHospital } from "../service/adminService";
import { useParams } from "react-router-dom";
const FindHospital = () => {
    const params = useParams();
    const [symptom, setSymptom] = useState([])
    const [department, setDepartment] = useState([]);
    const [hospital, setHospital] = useState([])
    const [latitude, setLatitude] = useState(10.755440156279546)
    const [longitude, setLongitude] = useState(106.66445996649227)
    const [hospital_id, setHospitalId] = useState(1)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const symptomdata = await getSymptom();
            const hospitaldata = await getHospital();
            setSymptom(symptomdata.data)
            setDepartment(symptomdata.data[0].department)
            setHospital(hospitaldata.data)
        }
        fetchData()
    }, []);
    useEffect(() => {
        setIsSubmitEnabled(date !== "" && time !== "");
    }, [date, time]);
    const handleSymptomChange = async (event) => {
        const data = await getDepartmentBySymptom(event.target.value)
        setDepartment(data.data)
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };
    const handleHospitalChange = (event) => {
        if (event.target.value == "Bệnh viện Đại học Y dược TPHCM") {
            setLatitude(10.755408535200909)
            setLongitude(106.6644277799864)
            setHospitalId(1)
        }
        else if (event.target.value == "Bệnh viện Nhân dân 115") {
            // 10.774514376992066, 106.66652836041224
            setLatitude(10.774514376992066)
            setLongitude(106.66652836041224)
            setHospitalId(2)
        }
        else if (event.target.value == "Bệnh viện Nhi đồng 1") {
            setLatitude(10.768639347913872)
            setLongitude(106.67017657173749)
            setHospitalId(3)
        }
        else if (event.target.value == "Bệnh viện Chợ Rẫy") {
            setLatitude(10.757882802313738)
            setLongitude(106.65951425891559)
            setHospitalId(4)
        }
        else if (event.target.value == "Bệnh viện Từ Dũ") {
            setLatitude(10.768264387260174)
            setLongitude(106.6854163524339)
            setHospitalId(5)
        }
    }
    const handleSubmit = async () => {
        const data = {
            date: date,
            time: time,
            status: "Booked",
            user_id: params.user_id,
            doctor_id: department.id + hospital_id - 1,
            department_id: department.id + hospital_id - 1,
        }
        await createNewAppointment(data)
        navigate("/user/" + params.user_id + "/history")

    }
    return (
        <>
            <Header role='user' />
            <div className="grid grid-cols-2 w-full lg:flex-row bg-gray-100 h-[calc(100vh-70px)]">
                <div className="grid flex-grow h-32 card rounded-box place-items-center">
                    <div className="bg-white mt-5 p-2 rounded-lg border-2 border-gray-400 shadow-xl">
                        <div className="flex justify-center">
                            <div className="text-xl font-bold">
                                Booking your appointments
                            </div>
                        </div>
                        <form className="mt-5 ml-5">
                            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-bold leading-6">
                                        What is your symptom?
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            onChange={(event) => handleSymptomChange(event)}
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {symptom.map((item) => {
                                                return <option>{item.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-bold leading-6 ">
                                        Department
                                    </label>
                                    <div className="mt-2">
                                        <input readOnly={true} value={department.name} className="block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-bold leading-6 ">
                                        Which hospital do you want to have an appointment?
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            onChange={(event) => handleHospitalChange(event)}
                                            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {hospital.map((item) => {
                                                return <option>{item.name}</option>
                                            })}
                                        </select>
                                    </div>

                                </div>
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-bold leading-6 ">
                                        When will you be available for the appointment?
                                    </label>
                                    <div className="mt-2">
                                        <input type="date"
                                            required
                                            value={date}
                                            onChange={handleDateChange}
                                            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-bold leading-6 ">
                                        Choose the time
                                    </label>
                                    <div className="mt-2">
                                        <input type="time"
                                            required
                                            value={time}
                                            onChange={handleTimeChange}
                                            className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                        </input>
                                    </div>
                                </div>

                            </div>
                            <button disabled={!isSubmitEnabled} onClick={handleSubmit} id="upLoadBtn" type="button" className="relative bottom-0 left-0 mt-10 rounded-lg bg-blue-600 px-4 py-2 text-md font-medium text-white hover:bg-blue-700 enabled:bg-blue-600 enabled:active:bg-blue-700 enabled:hover:bg-blue-700 enabled:hover:shadow-lg enabled:active:ring ring-blue-400 enabled:focus:ring enabled:focus:outline-none
                                        disabled:bg-blue-400">
                                BOOK
                            </button>
                        </form>
                    </div>

                </div>

                <div className="grid flex-grow h-32 mt-12 mr-12 card rounded-box place-items-center">
                    <div className="bg-white rounded-lg border-2 border-gray-400 shadow-xl">
                        <iframe
                            width="600"
                            height="500"
                            loading="lazy"
                            className="shadow-xl"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDwi3aHuwPxo2xmyUEiVNmvPWsQHoUtk3Y&q=${latitude},${longitude}`}
                        ></iframe>
                    </div>
                </div>
            </div>

        </>
    );
}
export default FindHospital