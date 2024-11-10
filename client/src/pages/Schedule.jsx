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
import { getSchedule, delSchedule } from "../service/adminService";
import EditField from "../components/EditField";
import AddField from "../components/AddField";
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
const TABLE_HEAD = ["ID", "Date", "Time", "Activity"];
const Schedule = () => {
    const params = useParams();
    const doctor_id = params.doctor_id;
    const department_id = params.department_id;
    const hospital_id = params.hospital_id;
    const [toggleEdit, setToggleEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [toggleAdd, setToggleAdd] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const navigate = useNavigate();
    const [scheduleData, setScheduleData] = useState([]);
    const handleNav = (request_data) => {
        if (request_data.request === "Edit") {
            setToggleEdit(!toggleEdit)
            setDataEdit(request_data.data)
        }
        else if (request_data.request === "Add") {
            setToggleAdd(!toggleAdd)
            setDataEdit(request_data.data)
        }
    }
    useEffect(() => {
        // Define an async function inside useEffect to fetch data
        const fetchData = async () => {
            try {
                // Call the getHospital function from the service
                const data = await getSchedule(doctor_id);

                // Update state with the fetched data
                setScheduleData(data.data);
                const breadcrumbData = [
                    { label: 'Hospitals', path: '/admin' },
                    { label: 'Departments', path: "/admin/hospital/" + hospital_id + "/department/" },
                    { label: 'Doctors', path: "/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" },
                    { label: 'Schedules', path: "/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" + doctor_id + "/schedule" },
                ];
                setBreadcrumbs(breadcrumbData);
            } catch (error) {
                // Handle errors if any
                console.error('Failed to fetch doctor data:', error);
            }
        };
        fetchData();
    }, []);
    const handleToggleEdit = async () => {
        setToggleEdit(!toggleEdit)
        const data = await getSchedule(doctor_id);
        setScheduleData(data.data);
    }

    const handleToggleAdd = async () => {
        setToggleAdd(!toggleAdd)
        const data = await getSchedule(doctor_id);
        setScheduleData(data.data);
    }
    const handleDeleteSchedule = async (id) => {
        alert("sdgjkndsj")
        await delSchedule(id);
        const data = await getSchedule(doctor_id);
        setScheduleData(data.data);
    }
    return (
        <>
            <Header role='admin' />
            <div className="px-36 bg-gray-100 h-[calc(100vh-70px)]">
                <Card className="relative h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Schedule
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are overview about schedule
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                                <Button className="flex items-center gap-3 bg-green-600" size="sm" onClick={() => handleNav({ request: "Add", data: { id: "", date: "", time: "", slot: "", doctor_id: doctor_id } })}>
                                    ADD <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
                                </Button>
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
                    <CardBody className="px-0">
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
                                {scheduleData && scheduleData.length > 0 && scheduleData.map(
                                    (
                                        schedule,
                                        index,
                                    ) => {
                                        const isLast = index === scheduleData.length - 1;
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
                                                        {format(new Date(schedule.date), 'dd/MM/yyyy')}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {schedule.time}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Tooltip content="Edit Schedule">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "Edit", data: { id: schedule.id, date: schedule.date, time: schedule.time, slot: schedule.slot, doctor_id: doctor_id } })}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Remove Schedule" >
                                                        <IconButton variant="text" onClick={() => handleDeleteSchedule(schedule.id)}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
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
            {toggleEdit && <EditField values={dataEdit} table="schedules" open={toggleEdit} parentCallBack={handleToggleEdit} />}
            {toggleAdd && <AddField values={dataEdit} table="schedules" open={toggleAdd} parentCallBack={handleToggleAdd} />}
        </>
    );
}

export default Schedule