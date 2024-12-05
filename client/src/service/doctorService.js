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

const handleGetFeedback = (doctor_id) => {
  return axios.get(`${backendURL}/api/feedbacks/${doctor_id}`, "_self");
};

export {
  handleGetInforDoctor,
  handleGetDoctorSchedule,
  handleGetDoctorScheduleNow,
  handleGetFeedback,
};
