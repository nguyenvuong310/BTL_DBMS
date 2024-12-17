import axios from "axios";
import { backendURL } from "../utils/constant";
const handleGetInforDoctor = (doctor_id) => {
  return axios.get(`${backendURL}/api/doctors/${doctor_id}`, "_self");
};

const handleGetDoctorSchedule = (doctor_id, day) => {
  return axios.get(
    `${backendURL}/api/doctor-schedules/${doctor_id}?day=${day}`,
    "_self",
  );
};

const handleGetDoctorScheduleNow = (doctor_id) => {
  return axios.get(
    `${backendURL}/api/doctor-schedules/now/${doctor_id}`,
    "_self",
  );
};

const getAllScheduleDoctor = () => {
  const token = localStorage.getItem("accessToken");

  return axios.get(`${backendURL}/api/doctor-schedules`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleGetFeedback = (doctor_id) => {
  return axios.get(`${backendURL}/api/feedbacks/${doctor_id}`, "_self");
};

const handleCreateSchedule = (data) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(`${backendURL}/api/doctor-schedules`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handlePrescription = (data) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(`${backendURL}/api/prescription`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  handleGetInforDoctor,
  handleGetDoctorSchedule,
  handleGetDoctorScheduleNow,
  handleGetFeedback,
  getAllScheduleDoctor,
  handleCreateSchedule,
  handlePrescription,
};
