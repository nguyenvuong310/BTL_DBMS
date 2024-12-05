import axios from "axios";
import { backendURL } from "../utils/constant";
const handleGetInforSpecialty = (specialty_id) => {
  return axios.get(`${backendURL}/api/specialty/${specialty_id}`, "_self");
};

const handleGetDoctorBySpecialty = (specialty_id) => {
  return axios.get(
    `${backendURL}/api/doctors/specialty/${specialty_id}`,
    "_self",
  );
};

export { handleGetInforSpecialty, handleGetDoctorBySpecialty };
