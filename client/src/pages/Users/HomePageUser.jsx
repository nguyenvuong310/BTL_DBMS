import Header from "../../components/Header";
import { Button, Carousel, Typography } from "@material-tailwind/react";
import { specialties, hospitalLocations, doctors } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const MedicalSpecialty = () => {
  return (
    <div className="relative mx-auto w-[80vw] rounded-lg bg-gray-50 p-8 shadow-md">
      <Typography
        variant="h1"
        className="mb-6 text-3xl font-bold text-gray-800"
      >
        Chuyên khoa
      </Typography>
      <Carousel
        loop
        className="rounded-xl"
        transition={{ duration: 1 }}
        navigation={false}
        prevArrow={({ handlePrev }) => (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handlePrev}
          >
            {"<"}
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handleNext}
          >
            {">"}
          </button>
        )}
      >
        {specialties.map((_, index) => {
          if (index % 3 === 0) {
            return (
              <div key={index} className="flex justify-center gap-16">
                {specialties.slice(index, index + 3).map((item, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex flex-col items-center rounded-lg bg-white p-4 px-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="h-32 w-32 rounded-md object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </Carousel>
    </div>
  );
};

const Hospitals = () => {
  return (
    <div className="relative mx-auto w-[80vw] rounded-lg bg-gray-50 p-8 shadow-md">
      <Typography
        variant="h1"
        className="mb-6 text-3xl font-bold text-gray-800"
      >
        Cơ sở y tế
      </Typography>
      <Carousel
        loop
        className="rounded-xl"
        transition={{ duration: 1 }}
        navigation={false}
        prevArrow={({ handlePrev }) => (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handlePrev}
          >
            {"<"}
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handleNext}
          >
            {">"}
          </button>
        )}
      >
        {hospitalLocations.map((_, index) => {
          if (index % 3 === 0) {
            return (
              <div key={index} className="flex justify-center gap-16">
                {hospitalLocations
                  .slice(index, index + 3)
                  .map((item, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex flex-col items-center rounded-lg bg-white p-4 px-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
                    >
                      <img
                        src={item.img}
                        alt={item.label}
                        className="h-32 w-32 rounded-md object-cover transition-transform duration-200 hover:scale-105"
                      />
                      <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                        {item.label}
                      </p>
                    </div>
                  ))}
              </div>
            );
          }
          return null;
        })}
      </Carousel>
    </div>
  );
};

const Doctors = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mx-auto w-[80vw] rounded-lg bg-gray-50 p-8 shadow-md">
      <Typography
        variant="h1"
        className="mb-6 text-3xl font-bold text-gray-800"
      >
        Bác sĩ nổi bật
      </Typography>
      <Carousel
        loop
        className="rounded-xl"
        transition={{ duration: 1 }}
        navigation={false}
        prevArrow={({ handlePrev }) => (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handlePrev}
          >
            {"<"}
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-3 text-gray-600 shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handleNext}
          >
            {">"}
          </button>
        )}
      >
        {doctors.map((_, index) => {
          if (index % 3 === 0) {
            return (
              <div key={index} className="flex justify-center gap-16">
                {doctors.slice(index, index + 3).map((item, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex flex-col items-center rounded-lg bg-white p-4 px-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      onClick={() => {
                        console.log("click");
                        navigate("/user/bookAppointment");
                        window.scrollTo(0, 0);
                      }}
                      className="h-32 w-32 rounded-md object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </Carousel>
    </div>
  );
};

const HomePageUser = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role="user" />
        <div className="flex w-full flex-col items-center justify-center gap-12 p-8">
          <MedicalSpecialty />
          <Hospitals />
          <Doctors />
        </div>
      </div>
    </>
  );
};

export default HomePageUser;
