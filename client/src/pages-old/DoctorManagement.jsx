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
import { getDoctor, delDoctor } from "../service/adminService";
import React, { useEffect, useState } from "react";
import EditField from "../components/EditField";
import AddField from "../components/AddField";
import { doc } from "prettier";
const TABLE_HEAD = ["ID", "Name", "Qualification", "Activity"];
const DoctorManagement = () => {
    const params = useParams();
    const hospital_id = params.hospital_id;
    const department_id = params.department_id;
    const navigate = useNavigate();
    const [doctorData, setDoctorData] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [toggleAdd, setToggleAdd] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const handleNav = (request_data) => {
        if (request_data.request === "Viewschedule") {
            var doctor_id = request_data.data;
            navigate("/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" + doctor_id + "/schedule");
        }
        else if (request_data.request === "Viewappointment") {
            var doctor_id = request_data.data;
            navigate("/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" + doctor_id + "/appointment");
        }
        else if (request_data.request === "Edit") {
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
                const data = await getDoctor(department_id);

                // Update state with the fetched data
                setDoctorData(data.data);
                const breadcrumbData = [
                    { label: 'Hospitals', path: '/admin' },
                    { label: 'Departments', path: "/admin/hospital/" + hospital_id + "/department/" },
                    { label: 'Doctors', path: "/admin/hospital/" + hospital_id + "/department/" + department_id + "/doctor/" },
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
        const data = await getDoctor(department_id);
        setDoctorData(data.data)
    }

    const handleToggleAdd = async () => {
        setToggleAdd(!toggleAdd)
        const data = await getDoctor(department_id);
        setDoctorData(data.data)
    }
    const handleDeleteDoctor = async (id) => {
        await delDoctor(id);
        const data = await getDoctor(department_id);
        setDoctorData(data.data)
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
                                    Doctor
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are overview about doctor
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                                <Button className="flex items-center gap-3 bg-green-600" size="sm" onClick={() => handleNav({ request: "Add", data: { id: "", name: "", birthday: "", address: "", gender: "", phone_number: "", qualifications: "", user_name: "", password: "", department_id: department_id } })}>
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
                    <CardBody className="px-0 ">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr >
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
                                {doctorData && doctorData.length > 0 && doctorData.map(
                                    (
                                        doctor,
                                        index,
                                    ) => {
                                        const isLast = index === doctorData.length - 1;
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
                                                        {doctor.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {doctor.qualifications}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Tooltip content="View Schedule">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "Viewschedule", data: doctor.id })}>
                                                            <CalendarIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="View Appointment">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "Viewappointment", data: doctor.id })}>
                                                            <EyeIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Doctor">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "Edit", data: { id: doctor.id, name: doctor.name, birthday: doctor.birthday, address: doctor.address, gender: doctor.gender, phone_number: doctor.phone_number, qualifications: doctor.qualifications, user_name: doctor.user_name, password: doctor.password, department_id: department_id } })}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Remove Doctor" >
                                                        <IconButton variant="text" onClick={() => handleDeleteDoctor(doctor.id)}>
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
                    <CardFooter className="flex absolute inset-x-0 bottom-0 items-center bottom-0 justify-between border-t border-blue-gray-50 p-4">
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
            {toggleEdit && <EditField values={dataEdit} table="doctors" open={toggleEdit} parentCallBack={handleToggleEdit} />}
            {toggleAdd && <AddField values={dataEdit} table="doctors" open={toggleAdd} parentCallBack={handleToggleAdd} />}
        </>
    );
}

export default DoctorManagement