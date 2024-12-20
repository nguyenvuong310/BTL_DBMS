import {
  MagnifyingGlassIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { getAppointmentHistory } from "../../service/userService";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import {
  getUserFromLocalStorage,
  hanleCancelAppointment,
} from "../../service/userService";
import { ModalPrescriptionUser } from "../../components/modalPrescriptionUser";
import { toast } from "react-toastify";

const user = getUserFromLocalStorage();
const TABLE_HEAD = [
  "Ngày hẹn",
  "Thời gian",
  "Bác sĩ",
  "Bệnh viện",
  "Địa chỉ",
  "Lý do khám",
  "Status",
  "",
];

export default function AppointmentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const itemsPerPage = 4;

  const handleClickCancel = (id) => {
    setModalOpen(true);
    setAppointmentId(id);
  };

  const handleCancel = async () => {
    setModalOpen(true);
    const isConfirmed = window.confirm("Bạn có chắc muốn hủy cuộc hẹn?");
    if (isConfirmed) {
      const data = {
        status: "CANCELLED",
        reason_cancel: reason,
      };

      const res = await hanleCancelAppointment(appointmentId, data);
      console.log("Cancel appointment:", res);
      if (res.status === 200) {
        setModalOpen(false);
        toast.success("Hủy cuộc hẹn thành công");
      }
    }
  };

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
        {/* {" >"} */}
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header role={user ? user?.role : "main"} />

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
                  Bác sĩ
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Bệnh viện
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Địa chỉ
                </th>
                <th className="w-32 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Lý do khám
                </th>
                <th className="w-24 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="w-5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"></th>
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
                      {appoinment.doctorName}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.hospitalName}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.address}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {appoinment.reason}
                    </div>
                  </td>
                  <td className="whitespace-normal break-words px-6 py-4">
                    <div className="flex w-max items-center gap-3">
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
                      {appoinment.canCancel && (
                        <div className="group relative">
                          <TrashIcon
                            className="h-5 w-5 cursor-pointer text-red-500"
                            onClick={() => handleClickCancel(appoinment.id)}
                          />
                          <div className="absolute left-1/2 mt-1 hidden -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs text-white group-hover:block">
                            Huỷ hẹn
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="whitespace-normal break-words py-4">
                    <ModalPrescriptionUser appointmentId={appoinment.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination(appointments)}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Lý do hủy hẹn
                </Typography>

                <Input
                  size="lg"
                  placeholder="Vui lòng nhập lý do huỷ"
                  className="!h-20 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={reason} // Bind the input's value to the state
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="mt-6 text-right">
                <Button
                  className="mt-6 bg-blue-500 text-white"
                  onClick={handleCancel}
                >
                  Huỷ hẹn
                </Button>
                <Button
                  className="ml-8 mt-6 bg-gray-200 text-gray-800"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Đóng
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
