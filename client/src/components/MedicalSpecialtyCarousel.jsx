import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecialty } from "../service/userService";
import { Carousel, Typography } from "@material-tailwind/react";

export const MedicalSpecialty = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    getSpecialty().then((res) => {
      setSpecialties(res.data.data);
    });
  }, []);

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
        className=" h-[220px] overflow-hidden rounded-xl"
        transition={{ duration: 1 }}
        navigation={false}
        prevArrow={({ handlePrev }) => (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-blue-300 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handlePrev}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-blue-300 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
            onClick={handleNext}
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        )}
      >
        {specialties.map((_, index) => {
          if (index % 4 === 0) {
            return (
              <div key={index} className="flex justify-center gap-16">
                {specialties.slice(index, index + 4).map((item, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex flex-col items-center rounded-lg bg-white p-4 px-4 shadow-md transition-shadow duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => {
                      navigate(`/${item.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-32 w-32 rounded-md object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <p className="mt-4 text-center text-lg font-semibold text-gray-700">
                      {item.name}
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
