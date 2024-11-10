import axios from "axios";
import { backendURL } from "../utils/constant";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
const getAllUser = async () => {
    const url = `${backendURL}/api/getalluser`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
    });
};

const getBlockedUser = async () => {
    const url = `${backendURL}/api/getblockeduser`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
    });
}

const blockUser = async (data) => {
    const url = `${backendURL}/api/blockuser`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const getAllPrinter = async () => {
    const url = `${backendURL}/api/admingetallprinter`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
    });
}
const deletePrinter = async (data) => {
    const url = `${backendURL}/api/deleteprinter`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const getUserBySearch = async (data) => {
    const url = `${backendURL}/api/admingetuserbysearch`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const getBlockedUserBySearch = async (data) => {
    const url = `${backendURL}/api/admingetblockeduserbysearch`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const AddPrinter = async (data) => {
    const url = `${backendURL}/api/addprinter`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const activePrinter = async (data) => {
    const url = `${backendURL}/api/activeprinter`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const getHistory = async () => {
    const url = `${backendURL}/api/admingetprinthistory`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
    });
}
const getHistorybySearch = async (data) => {
    const url = `${backendURL}/api/admingetprinthistorybymssv`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const UpdatePrinter = async (data) => {
    const url = `${backendURL}/api/updateprinter`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const ConfirmPrinted = async (data) => {
    const url = `${backendURL}/api/confirmprinted`;
    return await axios({
        url: url,
        method: "POST",
        withCredentials: true,
        data: data
    });
}
const getHospital = async () => {
    const url = `${backendURL}/api/Hospital/GetAllHospital`;
    return await axios.get(url);
};
const getDepartment = async (id) => {
    const url = `${backendURL}/api/Department/GetDepartmentByHospitalId/${id}`;
    return await axios.get(url);
};

const getDoctor = async (id) => {
    const url = `${backendURL}/api/Doctor/GetDoctorByDepartmentId/${id}`;
    return await axios.get(url);
} 
const getSchedule= async (id) => {
    const url = `${backendURL}/api/Schedule/getAllSchedule/${id}`;
    return await axios.get(url);
} 
const getAppointment= async (id) => {
    const url = `${backendURL}/api/Appointment/GetAllDepartmentByDoctor/${id}`;
    return await axios.get(url);
} 
const createNewHospital = async (data) => {
    const url = `${backendURL}/api/Hospital/CreateNewHospital`;
    return await axios.post(url, data);
}
const editHospital = async (data) => {
    const url = `${backendURL}/api/Hospital/UpdateHospitalById/${data.id}`;
    return await axios.put(url, data);
}
const createNewDepartment = async (data) => {
    const url = `${backendURL}/api/Department/CreateNewDepartment?hospital_id=${data.hospital_id}`;
    return await axios.post(url, data);
}
const editDepartment = async (data) => {
    const url = `${backendURL}/api/Department/UpdateDepartmentById/${data.id}`;
    return await axios.put(url, data);
}
const createNewDoctor = async (data) => {
    const url = `${backendURL}/api/Doctor/CreateNewDoctor?department_id=${data.department_id}`;
    return await axios.post(url, data);
}
const editDoctor = async (data) => {
    const url = `${backendURL}/api/Doctor/UpdateDoctorById/${data.id}`;
    return await axios.put(url, data);
}
const createNewSchedule = async (data) => {
    const url = `${backendURL}/api/Schedule/CreateNewSchedule?doctor_id=${data.doctor_id}`;
    return await axios.post(url, data);
}
const editSchedule = async (data) => {
    const url = `${backendURL}/api/Schedule/UpdateScheduleById/${data.id}`;
    return await axios.put(url, data);
}
const delHospital = async (id) => {
    try {
        const url = `${backendURL}/api/Hospital/DeleteHospitalById/${id}`;
        return await axios.delete(url);
    } catch {
        alert("The hospital currently has departments so it cannot be deleted")
    }  
};
const delDepartment = async (id) => {
    try {
        const url = `${backendURL}/api/Department/DeleteDepartmentById/${id}`;
        return await axios.delete(url);
    }
    catch {
        alert("The department currently has doctors so it cannot be deleted")
    }
};
const delDoctor = async (id) => {
    try {
        const url = `${backendURL}/api/Doctor/DeleteDoctorById/${id}`;
        return await axios.delete(url);
    }
    catch {
        alert("The doctor currently has appointments or schedules so it cannot be deleted")
    } 
};
const delSchedule = async (id) => {
    try {
        const url = `${backendURL}/api/Schedule/DeleteScheduleById/${id}`;
        return await axios.delete(url);
    }
    catch {
        alert("The schedule cannot be deleted")
    } 
};
export {
    getAllUser,
    getBlockedUser,
    blockUser,
    getAllPrinter,
    deletePrinter,
    getUserBySearch,
    getBlockedUserBySearch,
    AddPrinter,
    activePrinter,
    getHistory,
    getHistorybySearch,
    UpdatePrinter,
    ConfirmPrinted,
    getHospital,
  getDepartment,
  delHospital,
  delDepartment,
  getDoctor,
  getSchedule,
  getAppointment,
  createNewHospital,
  editHospital,
  createNewDepartment,
  editDepartment,
  createNewDoctor,
  editDoctor,
  createNewSchedule,
  editSchedule,
  delDoctor,
  delSchedule
};