import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import EditField from "../components/EditField";
import AddField from "../components/AddField";
import { getHospital, delHospital } from "../service/adminService";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
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
const TABLE_HEAD = ["ID", "Name", "Location", "Activity"];

const HomePageAdmin = () => {
    const navigate = useNavigate();
    const [hospitalData, setHospitalData] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [toggleAdd, setToggleAdd] = useState(false);
    const handleNav = (request_data) => {
        if (request_data.request === "View") {
            var hospital_id = request_data.data;
            navigate("/admin/hospital/" + hospital_id + "/department");
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
                const data = await getHospital();

                // Update state with the fetched data
                setHospitalData(data.data);
            } catch (error) {
                // Handle errors if any
                console.error('Failed to fetch hospital data:', error);
            }
        };
        fetchData();
    }, []);
    const handleDeleteHospital = async (id) => {
        await delHospital(id);
        const data = await getHospital();
        setHospitalData(data.data)
    }
    const handleToggleEdit = async () => {
        setToggleEdit(!toggleEdit)
        const data = await getHospital();
        setHospitalData(data.data)
    }

    const handleToggleAdd = async () => {
        setToggleAdd(!toggleAdd)
        const data = await getHospital();
        setHospitalData(data.data)
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
                                    Hospital
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are overview about hospital
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                                <Button className="flex items-center gap-3 bg-green-600" size="sm" onClick={() => handleNav({ request: "Add", data: { id: "", name: "", location: "" } })}>
                                    ADD <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className=" px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y bg-blue-500 p-4"
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
                                {hospitalData && hospitalData.length > 0 && hospitalData.map(
                                    (
                                        hospital,
                                        index,
                                    ) => {
                                        const isLast = index === hospitalData.length - 1;
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
                                                        {hospital.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {hospital.location}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Tooltip content="View departments">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "View", data: hospital.id })}>
                                                            <EyeIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Edit Hospital">
                                                        <IconButton variant="text" onClick={() => handleNav({ request: "Edit", data: { id: hospital.id, name: hospital.name, location: hospital.location } })}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Remove Hospital" >
                                                        <IconButton variant="text" onClick={() => handleDeleteHospital(hospital.id)}>
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
            {toggleEdit && <EditField values={dataEdit} table="hospitals" open={toggleEdit} parentCallBack={handleToggleEdit} />}
            {toggleAdd && <AddField values={dataEdit} table="hospitals" open={toggleAdd} parentCallBack={handleToggleAdd} />}
        </>
    );
}

export default HomePageAdmin