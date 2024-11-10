import axios from "axios";
import { backendURL } from "../utils/constant";
const handleAuth = (role) => {
  window.open(`${backendURL}/auth/google?role=${role}`, "_self");
};
const getUser = async () => {
  const url = `${backendURL}/auth/login/success`;
  return await axios.get(url, { withCredentials: true });
};
const saveUserToLocalStorage = async (user) => {
  await localStorage.setItem("user", JSON.stringify(user));
};
const saveRoleToLocalStorage = async (role) => {
  console.log("role", role);
  await localStorage.setItem("role", JSON.stringify(role));
};
const getRoleFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("role"));
};
const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  // window.open(`${backendURL}/auth/logout`, "_self");
};

const getUserInfo = async () => {
  const url = `${backendURL}/api/getUserInfo`;
  return await axios({
    url: url,
    method: "GET",
    withCredentials: true,
  });
}

const getListCourse = async () => {
  const url = `${backendURL}/api/getlistcourse`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
  });
}
const getDocByUserid = async (data) => {
  const url = `${backendURL}/api/getalldoc?userid=${data}`;
  return await axios({
    url: url,
    method: "GET",
    withCredentials: true,
    data: data,
  })
}
const getPrivateDocBySearch = async (data) => {
  const url = `${backendURL}/api/getdocbysearch`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data,
  })
}
const uploadFile = async (data) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("course", data.course);
  formData.append("location", data.location);
  const url = `${backendURL}/drive/uploadFile`;
  return await axios({
    url: url,
    method: "POST",
    data: formData,
    withCredentials: true,
  });
}
const getAllPrinter = async () => {
  const url = `${backendURL}/api/getallprinter`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
  });
}
const Print = async (data) => {
  const url = `${backendURL}/api/print`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data
  });
}
const buypage = async (data) => {
  const url = `${backendURL}/api/buypage`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data
  });
}
const getHistory = async (data) => {
  const url = `${backendURL}/api/getprinthistory`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data
  });
}
const getDocBySearchPublic = async (data) => {
  const url = `${backendURL}/api/getdocbysearchpublic`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data
  });
}
const getDocBySearchName = async (data) => {
  const url = `${backendURL}/api/getdocbysearchname`;
  return await axios({
    url: url,
    method: "POST",
    withCredentials: true,
    data: data
  });
}
const handleLogin = async (username, password) => {
  const url = `${backendURL}/api/User/handleLogin?username=${username}&password=${password}`;
  return await axios.get(url);
}
const getInfoUserById = async (user_id) => {
  const url = `${backendURL}/api/User/GetUser/${user_id}`;
  return await axios.get(url);
}
const getSymptom = async () => {
  const url = `${backendURL}/api/Symptom/GetAllSymptom`;
  return await axios.get(url);
}
const getDepartmentBySymptom = async (symptom) => {
  const url = `${backendURL}/api/Department/GetDepartmentBySymptom?symptom=${symptom}`;
  return await axios.get(url);
}
const createNewAppointment = async (data) => {
  const url = `${backendURL}/api/Appointment/CreateNewAppointment?department_id=${data.department_id}&user_id=${data.user_id}&doctor_id=${data.doctor_id}`;
  return await axios.post(url, data);
}
const UpdateAppointment = async (data) => {
  const url = `${backendURL}/api/Appointment/UpdateAppointmentById/${data.id}`;
  return await axios.put(url, data);
}
const getAppointmentHistory = async (user_id) => {
  const url = `${backendURL}/api/Appointment/GetAllDepartmentByUser/${user_id}`;
  return await axios.get(url);
}
export {
  handleAuth,
  getUser,
  saveUserToLocalStorage,
  logout,
  getUserInfo,
  getDocByUserid,
  uploadFile,
  getListCourse,
  getAllPrinter,
  Print,
  getPrivateDocBySearch,
  buypage,
  getHistory,
  getDocBySearchPublic,
  getDocBySearchName,
  handleLogin,
  getInfoUserById,
  getSymptom,
  getDepartmentBySymptom,
  createNewAppointment,
  getAppointmentHistory,
  UpdateAppointment
};
