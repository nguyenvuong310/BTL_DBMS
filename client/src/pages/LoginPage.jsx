import medicalImage from "../assets/medical.jpg";
import { Button } from "@material-tailwind/react";
import { FaUser, FaUserNurse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const UserButtons = () => {
    return (
      <div className="flex space-x-12">
        <Button
          className="flex h-40 w-60 flex-col items-center justify-center rounded-lg bg-teal-500/80 shadow-md transition duration-300 hover:bg-teal-400/80"
          variant="filled"
          ripple={true}
          onClick={() => navigate("/user")}
        >
          <FaUser className="mb-2 text-5xl text-white" />
          <span className="text-lg font-semibold text-white">
            NGƯỜI DÙNG KHÁCH
          </span>
        </Button>

        <Button
          className="flex h-40 w-60 flex-col items-center justify-center rounded-lg bg-teal-600/80 shadow-md transition duration-300 hover:bg-teal-500/80"
          variant="filled"
          ripple={true}
        >
          <FaUserNurse className="mb-2 text-5xl text-white" />
          <span className="text-lg font-semibold text-white">BÁC SĨ</span>
        </Button>
      </div>
    );
  };
  return (
    <>
      <div
        className="h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${medicalImage})` }}
      >
        <div className="flex min-h-full  flex-1 flex-col justify-center self-center px-6 py-12 lg:px-8">
          <div className=" max-w-[400px]  sm:mx-auto ">
            <UserButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
