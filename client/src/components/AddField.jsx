import React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";

import { createNewHospital, createNewDepartment, createNewDoctor, createNewSchedule } from "../service/adminService"
const AddField = ({ values, table, open, parentCallBack }) => {
    const current_value = values;
    // console.log(form_value)
    const keys = Object.keys(current_value)


    const [formData, setFormData] = useState(current_value)
    const [notification, setNotification] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        keys.map((key) => {
            data[key] = formData[key]
        })

        if (table === "hospitals") {
            console.log("Hospitals", data)
            await createNewHospital(data)
        }
        else if (table === "departments") {
            console.log("Department", data)
            await createNewDepartment(data)
        }
        else if (table === "doctors") {
            console.log("Doctor", data)
            await createNewDoctor(data)
        }
        else if (table === "schedules") {
            console.log("Doctor", data)
            await createNewSchedule(data)
        }
        setNotification(!notification)
        setTimeout(() => {
            setNotification((prev) => !prev)
        }, 2000);
        handleOpen()
    }

    const [openDialog, setOpenDialog] = useState(open);
    const handleOpen = () => {
        setOpenDialog(!openDialog)
        parentCallBack()
    }

    const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <>

            <Dialog open={openDialog} className="max-h-[80%] overflow-auto">
                <DialogHeader className="text-2xl text-center">Add new {capitalizeFirst(table)}</DialogHeader>
                <DialogBody>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                            {keys.map((key, index) => {
                                if (key === "id" || key === "hospital_id" || key === "department_id" || key === "user_name" || key === "password" || key === "doctor_id") return;
                                if (key == "date" || key == "birthday") {
                                    return (
                                        <div key={index}>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{capitalizeFirst(key)}</label>
                                            <input type="date" name={key} className={`add-field-${key} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={`Add new ${key}`} required onChange={handleChange} />
                                        </div>
                                    )
                                }
                                return (
                                    <div key={index}>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{capitalizeFirst(key)}</label>
                                        <input type="text" name={key} className={`add-field-${key} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={`Add new ${key}`} required onChange={handleChange} />
                                    </div>
                                )
                            })}


                        </div>

                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input type="checkbox" id="add-field-confirm" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="add-field-confirm" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Create</label>
                        </div>
                        {notification && <button type="button" className="fixed right-4 top-4 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
                            <div class="flex items-center space-x-2">
                                <span class="text-3xl"><i class="bx bx-check"></i></span>
                                <p class="font-bold">Item Created Successfully!</p>
                            </div>
                        </button>}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button onClick={handleOpen} type="button" className="ml-1.5 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>
                    </form>
                </DialogBody>
            </Dialog >
        </>

    );
}

export default AddField;