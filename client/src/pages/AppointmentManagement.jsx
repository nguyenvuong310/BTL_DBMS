import HeaderAdmin from "../components/HeaderAdmin";
import Header from "../components/Header";
import { PencilIcon, EyeIcon, CalendarIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAppointment } from "../service/adminService";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
const TABLE_HEAD = ["ID", "Patient", "Doctor", "Department", "Date", "Time", "Status"];
const Appointment = () => {
    const params = useParams();
    const doctor_id = params.doctor_id;
    const hospital_id = params.hospital_id;
    const department_id = params.department_id;
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    useEffect(() => {
        // Define an async function inside useEffect to fetch data
        const fetchData = async () => {
            try {
                // Call the getHospital function from the service
                const data = await getAppointment(doctor_id);

                // Update state with the fetched data
                setAppointmentData(data.data);
                const breadcrumbData = [
                    { label: 'Hospitals', path: '/admin' },
                    { label: 'Departments', path: "/admin/hospital/" + hospital_id + "/department/" },
                    { label: 'Doctors', path: "/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" },
                    { label: 'Appointments', path: "/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" + doctor_id + "/appointment" },
                ];
                setBreadcrumbs(breadcrumbData);
            } catch (error) {
                // Handle errors if any
                console.error('Failed to fetch doctor data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Header role='admin' />
            <div className="px-36 bg-gray-100 h-[calc(100vh-70px)]">
                <Card className="relative h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Appointments
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are overview about appointments
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>

                            </div>
                        </div>
                    </CardHeader>
                    <nav area-label='breadcrumb'>
                        <ol className='breadcrumb flex gap-2 ml-4 mt-2 text-blue-500'>
                            {
                                breadcrumbs.map((breadcrumb, index) => (
                                    <li key={index} className='breadcrumb-item'>
                                        {
                                            index === breadcrumbs.length - 1 ? (
                                                <span>
                                                    {breadcrumb.label}
                                                </span>

                                            ) : (
                                                <a href={breadcrumb.path} className="hover:text-blue-900">
                                                    {breadcrumb.label}

                                                    <a className="opacity-50" > {">"} </a>
                                                </a>

                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ol>
                    </nav>
                    <CardBody className=" px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-500 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="white"
                                                className="font-bold leading-none opacity-80"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData && appointmentData.length > 0 && appointmentData.map(
                                    (
                                        appointment,
                                        index,
                                    ) => {
                                        const isLast = index === appointmentData.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={index}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {appointment.user.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {appointment.doctor.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {appointment.department.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {format(new Date(appointment.date), 'dd/MM/yyyy')}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {appointment.time}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {appointment.status}
                                                    </Typography>
                                                </td>


                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex absolute inset-x-0 bottom-0 items-center justify-between border-t border-blue-gray-50 p-4">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            <IconButton variant="outlined" size="sm">
                                1
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                2
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                3
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                ...
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                8
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                9
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                10
                            </IconButton>
                        </div>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </>
    );
}

export default Appointment