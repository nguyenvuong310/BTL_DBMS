import { path, USER_ROLE } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import medicalImage from "../assets/medical.jpg"
import React, { useState } from "react";
import { handleLogin } from "../service/userService";
const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleOnChangeName = (event) => {
        setUsername(event.target.value)
    }
    const handleOnChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        if (username == 'admin' && password == 'admin') {
            navigate(path.HOMEPAGEADMIN);
        } else {
            const data = await handleLogin(username, password);
            if (data && data.data && data.data.id) {
                console.log(data)
                navigate("/user/" + data.data.id)
            } else {
                alert("Tai khoan khong ton tai")
            }
        }
        event.preventDefault();
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };
    return (
        <>
            <div className="flex flex-rol">
                <img src={medicalImage} alt="image" className="h-screen" />

                <div className="flex min-h-full  flex-1 flex-col justify-center self-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full max-w-[300px]">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto  max-w-[300px] ">
                        <div className="space-y-6"  >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        className="pl-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(event) => handleOnChangeName(event)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
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
                                    Sign in
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Start a 14 day free trial
                            </a>
                        </p>
                    </div>
                </div>
                {/* <button className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white" onClick={() => handleLogin("user")}>
                        Login as User
                    </button>
                    <button className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white" onClick={() => handleLogin("admin")}>
                        Login as Admin
                    </button> */}
            </div>


        </>
    );
}

export default LoginPage
