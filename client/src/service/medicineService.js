import axios from "axios";
import { backendURL } from "../utils/constant";
const handleGetAllMedine = (query) => {
  return axios.get(`${backendURL}/api/medicine?excludeIds=${query}`);
};

export { handleGetAllMedine };
