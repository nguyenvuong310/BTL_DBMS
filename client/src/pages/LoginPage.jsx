import medicalImage from "../assets/medical.jpg";
import { Button } from "@material-tailwind/react";
import { FaUser, FaUserNurse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../service/userService";

const LoginPage = () => {
  const [userType, setUserType] = useState("");
  const UserButtons = () => {
    return (
      <div className="flex space-x-12">
        <Button
          className="flex h-40 w-60 flex-col items-center justify-center rounded-lg bg-teal-500/80 shadow-md transition duration-300 hover:bg-teal-400/80"
          variant="filled"
          ripple={true}
          onClick={() => setUserType("user")}
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
          onClick={() => setUserType("doctor")}
        >
          <FaUserNurse className="mb-2 text-5xl text-white" />
          <span className="text-lg font-semibold text-white">BÁC SĨ</span>
        </Button>
      </div>
    );
  };

  const InputFieldUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleOnChangeName = (event) => {
      setUsername(event.target.value);
    };
    const handleOnChangePassword = (event) => {
      setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
      handleLogin();
      event.preventDefault();
    };

    const handleLogin = async () => {
      try {
        const response = await loginUser(username, password);
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/user");
      } catch (error) {
        console.error("Login failed", error);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };
    return (
      <div className="flex min-h-full flex-1  flex-col justify-center self-center rounded-lg bg-white px-6 py-12 lg:px-8">
        <div className="max-w-[300px] sm:mx-auto sm:w-full">
          <h2 className=" mb-5 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập với tư cách người dùng
          </h2>
        </div>
        <div className="max-w-[300px]  sm:mx-auto ">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên đăng nhập
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => handleOnChangeName(event)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mật khẩu
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Quên mật khẩu
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => handleOnChangePassword(event)}
                  onKeyPress={(event) => handleKeyPress(event)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const InputFieldDoctor = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleOnChangeName = (event) => {
      setUsername(event.target.value);
    };
    const handleOnChangePassword = (event) => {
      setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
      handleLogin();
      event.preventDefault();
    };

    const handleLogin = async () => {
      try {
        const response = await loginUser(username, password);
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        if (response.data.data.user.role === "DOCTOR") {
          console.log("doctor");
          navigate("/doctor");
          return;
        }
        navigate("/user");
      } catch (error) {
        console.error("Login failed", error);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };
    return (
      <div className="flex min-h-full flex-1  flex-col justify-center self-center rounded-lg bg-white px-6 py-12 lg:px-8">
        <div className="max-w-[300px] sm:mx-auto sm:w-full">
          <h2 className=" mb-5 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập với vai trò bác sĩ
          </h2>
        </div>
        <div className="max-w-[300px]  sm:mx-auto ">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên đăng nhập
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => handleOnChangeName(event)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mật khẩu
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Quên mật khẩu
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => handleOnChangePassword(event)}
                  onKeyPress={(event) => handleKeyPress(event)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
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
            {/* <UserButtons /> */}
            {userType === "" ? (
              <UserButtons />
            ) : userType === "user" ? (
              <div>
                <InputFieldUser />
              </div>
            ) : (
              <div>
                <InputFieldDoctor />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
