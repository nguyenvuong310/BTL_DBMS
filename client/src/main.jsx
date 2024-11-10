import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import HomePageUser from "./pages/HomePageUser.jsx";
import HomePageAdmin from "./pages/HomePageAdmin.jsx";
import FindHospital from "./pages/FindHospital.jsx";
import Schedule from "./pages/Schedule.jsx";
import DoctorManagement from "./pages/DoctorManagement.jsx";
import AppointmentManagement from "./pages/AppointmentManagement.jsx";
// import AdminHospital from "./pages/AdminHospital.jsx"
import AdminDepartment from "./pages/AdminDepartment.jsx";
import UserHistory from "./pages/UserHistory.jsx";
import "./index.css";
import { path } from "../src/utils/constant.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={path.LOGIN} element={<LoginPage />} />

      <Route path="/" element={<App />}>
        <Route index={true} element={<HomePage />} />
        <Route path="/user">
          <Route index={true} element={<HomePageUser />}></Route>
          <Route path=":user_id" element={<HomePageUser />} />
          <Route
            path="/user/:user_id/findHospital"
            element={<FindHospital />}
          />
          <Route path="/user/:user_id/history" element={<UserHistory />} />
        </Route>
        <Route path="/admin">
          <Route index={true} element={<HomePageAdmin />}></Route>
          <Route
            path="/admin/hospital/:hospital_id/department"
            element={<AdminDepartment />}
          />
          <Route
            path="/admin/hospital/:hospital_id/department/:department_id/doctor"
            element={<DoctorManagement />}
          />
          <Route
            path="/admin/hospital/:hospital_id/department/:department_id/doctor/:doctor_id/schedule"
            element={<Schedule />}
          />
          <Route
            path="/admin/hospital/:hospital_id/department/:department_id/doctor/:doctor_id/appointment"
            element={<AppointmentManagement />}
          />
        </Route>
      </Route>
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
