import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";

import { getAppointmentHistory } from "../../service/userService";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Header from "../../components/Header";
import { ModalPrescription } from "../../components/modalPrescription";
import { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../../service/userService";
const user = getUserFromLocalStorage();
const TABLE_HEAD = [
  "Ngày hẹn",
  "Thời gian",
  "Bệnh nhân",
  "Lý do khám",
  "Status",
  "",
];

export default function Appointment() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [appointments, setAppointments] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  useEffect(() => {
    const fetchAppointmentHistory = async () => {
      try {
        const response = await getAppointmentHistory(currentPage); // Use the updated current page
        setAppointments(response.data.data.items);
        console.log("Appointment history:", response.data.data.items.length);

        setIsNext(response.data.data.meta.isNext);
        setIsPrevious(response.data.data.meta.isPrevious);
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      }
    };

    fetchAppointmentHistory();
  }, [currentPage]);

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const renderPagination = (data) => (
    <div className="mt-4 flex items-center justify-end space-x-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-5 w-5 cursor-pointer " />
      </button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages(data)}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages(data)))
        }
        disabled={currentPage === totalPages(data)}
        className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRightIcon className="h-5 w-5 cursor-pointer " />
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header role={user ? user.role : "main"} />

      <div className="container mx-auto p-6">
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ngày hẹn
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Thời gian
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Bệnh nhân
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Lý do khám
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Đơn thuốc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {getPaginatedData(appointments).map((appoinment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appoinment.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.start_time} - {appoinment.end_time}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.patientName}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.reason}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="flex w-max items-center">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={appoinment.status}
                        color={
                          appoinment.status === "DONE"
                            ? "green"
                            : appoinment.status === "PENDING"
                              ? "amber"
                              : appoinment.status === "CANCELED"
                                ? "gray"
                                : appoinment.status === "CONFIRMED"
                                  ? "blue" // You can use any color you prefer for canceled appointments
                                  : "red"
                        }
                      />
                    </div>
                  </td>
                  <td className="">
                    <div className="ml-12 flex items-center">
                      <ModalPrescription
                        appointmentId={appoinment.id}
                        hasPrescription={appoinment.hasPrescription}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination(appointments)}
        </div>
      </div>
    </div>
  );
}
