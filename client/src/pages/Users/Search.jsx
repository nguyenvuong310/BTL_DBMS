import Header from "../../components/Header";

import { Input } from "@material-tailwind/react";
import { getUserFromLocalStorage } from "../../service/userService";
const user = getUserFromLocalStorage();

const SearchPage = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role={user ? user?.role : "main"} type="search" />
        <div className="flex w-full flex-col items-center justify-center gap-12 p-8">
          <div className="flex gap-4">
            {/* Regular Input Field */}
            <Input className="w-72" />

            {/* Select Dropdown */}
            <select className="w-72 rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="ALL">Tất cả</option>
              <option value="DOCTOR">Bác sĩ</option>
              <option value="SPECIALTY">Chuyên Khoa</option>
              <option value="HOSPITAL">Bệnh viện</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
