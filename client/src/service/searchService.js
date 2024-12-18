import axios from "axios";
import { backendURL } from "../utils/constant";
const handleSearch = (type, search) => {
  return axios.get(
    `${backendURL}/api/search?type=${type}&search=${search}`,
    "_self",
  );
};

export { handleSearch };
