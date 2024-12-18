import Header from "../../components/Header";

import { getUserFromLocalStorage } from "../../service/userService";
import { handleSearch } from "../../service/searchService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const user = getUserFromLocalStorage();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [dontMatch, setDontMatch] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  useEffect(() => {
    let debounceTimeout;

    const fetchData = async () => {
      if (search) {
        setLoading(true);
        setDontMatch(false);

        try {
          const response = await handleSearch(selectedType, search);
          const doctors = response.data.data.doctors;
          const hospitals = response.data.data.hospitals;
          const specialties = response.data.data.specialties;

          setDoctors(doctors);
          setHospitals(hospitals);
          setSpecialties(specialties);

          // Set "dontMatch" if no data matches
          if (
            (selectedType === "DOCTOR" && doctors.length === 0) ||
            (selectedType === "HOSPITAL" && hospitals.length === 0) ||
            (selectedType === "SPECIALTY" && specialties.length === 0) ||
            (selectedType === "ALL" &&
              doctors.length === 0 &&
              hospitals.length === 0 &&
              specialties.length === 0)
          ) {
            setDontMatch(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        setLoading(false);
      } else {
        // Reset state if search input is empty
        setDontMatch(false);
        setDoctors([]);
        setHospitals([]);
        setSpecialties([]);
      }
    };

    debounceTimeout = setTimeout(() => {
      fetchData();
    }, 500); // 1-second delay

    // Cleanup function to clear timeout
    return () => clearTimeout(debounceTimeout);
  }, [search, selectedType]);

  const SearchHospital = ({ hospitals }) => {
    const navigate = useNavigate();
    return (
      <div className="mx-auto mt-4  w-[900px] rounded-lg bg-white p-4 shadow-lg">
        {/* Header */}
        <div className="mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-lg font-bold text-gray-800">Bệnh viện</h2>
        </div>

        {/* List */}
        <div className="h-96 overflow-y-auto">
          <ul>
            {hospitals.map((item) => (
              <li
                key={item.id}
                className="flex cursor-pointer items-center  gap-4 border-b border-gray-200 py-4"
                onClick={() => navigate("/hospital/" + item.id)}
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-500">
                  <img
                    src={item.logo}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </div>

                {/* Title */}
                <div className="text-md text-gray-700">{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const SearchSpecialty = ({ specialties }) => {
    const navigate = useNavigate();
    return (
      <div className="mx-auto mt-4  w-[900px] rounded-lg bg-white p-4 shadow-lg">
        {/* Header */}
        <div className="mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-lg font-bold text-gray-800">Chuyên khoa</h2>
        </div>

        {/* List */}
        <div className="h-96 overflow-y-auto">
          <ul>
            {specialties.map((item) => (
              <li
                key={item.id}
                className="flex cursor-pointer cursor-pointer  items-center gap-4 border-b border-gray-200 py-1"
                onClick={() => navigate("/specialty/" + item.id)}
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-500">
                  <img
                    src={item.logo}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </div>

                {/* Title */}
                <div className="text-md text-gray-700">{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const SearchDoctor = ({ doctors }) => {
    const navigate = useNavigate();
    return (
      <div className="mx-auto mt-4  w-[900px] rounded-lg bg-white p-4 shadow-lg">
        {/* Header */}
        <div className="mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-lg font-bold text-gray-800">Bác sĩ</h2>
        </div>

        {/* List */}
        <div className="h-96 overflow-y-auto">
          <ul>
            {doctors.map((item) => (
              <li
                key={item.id}
                className="flex cursor-pointer cursor-pointer  items-center gap-4 border-b border-gray-200 py-1"
                onClick={() => navigate("/doctor/" + item.id)}
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-500">
                  <img
                    src={item.avatar}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </div>

                {/* Title */}
                <div className="text-md text-gray-700">{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role={user ? user?.role : "main"} type="search" />
        <div className="flex  w-full flex-col items-center gap-12 p-8">
          <div className="flex w-[900px] gap-4 rounded-lg border border-gray-300 bg-gray-200 p-2">
            {/* Regular Input Field */}
            <div className="flex  w-4 items-center justify-center ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>

            <div className="w-[700px] border-r-2 border-black">
              <input
                type="text"
                className=" w-full rounded-md border border-none bg-gray-200 p-2  outline-none focus:border-none focus:outline-none focus:ring-0"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="w-36 rounded-md border border-none bg-gray-200 p-2  outline-none focus:border-none focus:outline-none focus:ring-0"
              value={selectedType} // Set the selected value based on state
              onChange={(e) => setSelectedType(e.target.value)} // Update the state when the value changes
            >
              <option value="ALL">Tất cả</option>
              <option value="DOCTOR">Bác sĩ</option>
              <option value="SPECIALTY">Chuyên Khoa</option>
              <option value="HOSPITAL">Bệnh viện</option>
            </select>
          </div>
          {loading && (
            <div className="flex h-56 w-56 items-center justify-center rounded-lg border border-gray-200 bg-transparent dark:border-gray-700 dark:bg-transparent">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}
          {search !== "" && dontMatch && (
            <div className="flex  w-96 items-center justify-center rounded-lg  bg-transparent dark:border-gray-700 ">
              Xin lỗi, không tìm thấy kết quả phù hợp!
            </div>
          )}
          {search !== "" && !dontMatch && (
            <div>
              {selectedType === "DOCTOR" && <SearchDoctor doctors={doctors} />}
              {selectedType === "HOSPITAL" && (
                <SearchHospital hospitals={hospitals} />
              )}
              {selectedType === "SPECIALTY" && (
                <SearchSpecialty specialties={specialties} />
              )}
              {selectedType === "ALL" && (
                <>
                  <SearchDoctor doctors={doctors} />
                  <SearchHospital hospitals={hospitals} />
                  <SearchSpecialty specialties={specialties} />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
