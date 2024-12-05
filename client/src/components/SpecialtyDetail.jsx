import { Card, Typography, Button, Avatar } from "@material-tailwind/react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  handleGetInforSpecialty,
  handleGetDoctorBySpecialty,
} from "../service/specialtyService";
import { getUserFromLocalStorage } from "../service/userService";

const SpecialistCard = ({ name, description, image, id }) => (
  <Card className="mb-4 flex flex-row items-center gap-4 p-4">
    <Avatar src={image} alt={name} className="mr-4 h-24 w-24" />
    <div>
      <Typography variant="h6" color="blue-gray">
        {name}
      </Typography>
      <Typography color="gray" className="mt-2">
        <span dangerouslySetInnerHTML={{ __html: description }}></span>
      </Typography>
      <Button color="blue" size="sm" className="mt-4">
        <Link to={`/doctor/${id}`} className="text-white">
          Xem thêm
        </Link>
      </Button>
    </div>
  </Card>
);

//

const SpecialtyDetail = () => {
  const user = getUserFromLocalStorage();
  const [specialty, setSpecialty] = useState({});
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchSpecialtyInfo = async () => {
      try {
        const url = window.location.href; // Get the full URL
        const uuid = url.split("/").pop(); // Extract the last part of the URL

        // Fetch specialty information
        const specialty = await handleGetInforSpecialty(uuid);
        setSpecialty(specialty.data.data);
        const doctors = await handleGetDoctorBySpecialty(uuid);
        setDoctors(doctors.data.data);

        console.log("Specialty information:", specialty.data.data); // Debugging/logging if needed
      } catch (error) {
        console.error("Error fetching specialty information:", error);
      }
    };

    // Execute the async function
    fetchSpecialtyInfo();

    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setRole(userData.role);
    }
  }, []);

  return (
    <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <Header role={user ? user.role : "main"} />
      <div className="container mx-auto p-4">
        <header className="my-8 text-center">
          <Typography variant="h2" color="blue-gray">
            Khám chuyên khoa {specialty.name}
          </Typography>
        </header>
        <section>
          <h2 className="text-justify ">
            <span className="text-lg">
              <b>Bác sĩ Thần kinh {specialty.name}</b>
            </span>
          </h2>
          <p className="text-justify ">
            <span className="text-sm">
              Danh sách các giáo sư, bác sĩ chuyên khoa {specialty.name} giỏi:
            </span>
          </p>
          <ul className="list-disc">
            {specialty.doctorsDescription &&
              specialty.doctorsDescription.map((doctor, index) => (
                <li key={index} className="text-justify">
                  {doctor}
                </li>
              ))}
          </ul>
          <h2 className="text-justify ">
            <span className="py-1 text-lg">
              <b>Khám bệnh chuyên khoa {specialty.name}</b>
            </span>
          </h2>
          <ul className="list-disc">
            {specialty.symptomDescriptions &&
              specialty.symptomDescriptions.map((symptom, index) => (
                <li key={index} className="text-justify">
                  <span className="text-sm">{symptom}</span>
                  <span>&nbsp;&nbsp;</span>
                </li>
              ))}
          </ul>
        </section>
        {/* Introduction Section */}
        {/* Specialists Section */}
        <section className="my-8">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Bác sĩ {specialty.name} giỏi
          </Typography>
          {doctors.map((doctor, index) => (
            <SpecialistCard
              key={index}
              name={doctor.name}
              description={doctor.bio}
              image={doctor.avatar}
              id={doctor.id}
            />
          ))}
        </section>
        {/* Articles Section */}
      </div>
    </div>
  );
};

export default SpecialtyDetail;
