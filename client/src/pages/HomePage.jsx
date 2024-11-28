import Header from "../components/Header";
import { DoctorsCarousel } from "../components/DoctorsCarousel";
import { HospitalsCarousel } from "../components/HospitalCarousel";
import { MedicalSpecialty } from "../components/MedicalSpecialtyCarousel";

const HomePage = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role="main" />
        <div className="flex w-full flex-col items-center justify-center gap-12 p-8">
          <MedicalSpecialty />
          <HospitalsCarousel />
          <DoctorsCarousel />
        </div>
      </div>
    </>
  );
};

export default HomePage;
