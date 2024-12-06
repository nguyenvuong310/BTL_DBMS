import axios from "axios";
import { backendURL } from "../utils/constant";
const handleGetInforHospital = (hospital_id) => {
  return axios.get(`${backendURL}/api/hospitals/${hospital_id}`, "_self");
};

export { handleGetInforHospital };
