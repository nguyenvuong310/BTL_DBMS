import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
// import HomePageUser from "./pages/HomePageUser.jsx";
// import HomePageAdmin from "./pages/HomePageAdmin.jsx";
// import FindHospital from "./pages/FindHospital.jsx";
// import Schedule from "./pages/Schedule.jsx";
// import DoctorManagement from "./pages/DoctorManagement.jsx";
// import AppointmentManagement from "./pages/AppointmentManagement.jsx";
// // import AdminHospital from "./pages/AdminHospital.jsx"
// import AdminDepartment from "./pages/AdminDepartment.jsx";
// import UserHistory from "./pages/UserHistory.jsx";
import PageHealthInsurance from "./pages/Users/ManageHealthInsurance.jsx";
import HomePageUser from "./pages/Users/HomePageUser.jsx";
import BookingAppointment from "./pages/Users/BookingAppointment.jsx";
import AppointmentHistory from "./pages/Users/AppointmentHistory.jsx";
import HospitalDetail from "./components/HospitalDetail.jsx";
import SpecialtyDetail from "./components/SpecialtyDetail.jsx";
import AuthUser from "./service/authUser.jsx";
import "./index.css";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<App />}>
        <Route index={true} element={<HomePage />} />
        <Route path="/doctor/:doctorId" element={<BookingAppointment />} />
        <Route path="/specialty/:specialtyId" element={<SpecialtyDetail />} />
        <Route path="/hospital/:hospitalId" element={<HospitalDetail />} />
        <Route path="/user" element={<AuthUser />}>
          <Route index={true} element={<HomePageUser />} />
          <Route path=":user_id" element={<HomePageUser />} />
          <Route path="/user/history" element={<AppointmentHistory />} />
          <Route
            path="/user/health-insurance"
            element={<PageHealthInsurance />}
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
