import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
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
  const [cureentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

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
        const response = await getAppointmentHistory(cureentPage); // Use the updated current page
        setAppointments(response.data.data.items);
        console.log("Appointment history:", response.data.data.items.length);
        setIsNext(response.data.data.meta.isNext);
        setIsPrevious(response.data.data.meta.isPrevious);
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      }
    };

    fetchAppointmentHistory();
  }, [cureentPage]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header role={user ? user?.role : "main"} />
      <Card className="flex-grow">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Cuộc hẹn gần đây
              </Typography>
              {/* <Typography color="gray" className="mt-1 font-normal">
                These are details about the last transactions
              </Typography> */}
            </div>
          </div>
        </CardHeader>

        <CardBody className=" px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appoinment, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {appoinment.date}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appoinment.start_time} - {appoinment.end_time}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appoinment.doctorName}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appoinment.hospitalName}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal capitalize"
                      >
                        {appoinment.address}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {appoinment.reason}
                      </Typography>
                    </td>
                    <td>
                      <div className="w-max">
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
                          <TrashIcon
                            className="h-5 w-5 cursor-pointer text-red-500"
                            onClick={() => handleClickCancel(appoinment.id)}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      {console.log("Appoinment:", appoinment.id)}
                      <ModalPrescriptionUser appointmentId={appoinment.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant={isPrevious ? "filled" : "outlined"}
            color={isPrevious ? "blue" : "gray"}
            size="sm"
            onClick={() => {
              if (isPrevious) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              {cureentPage}
            </IconButton>
          </div>
          <Button
            variant={isNext ? "filled" : "outlined"}
            color={isNext ? "blue" : "gray"}
            size="sm"
            onClick={() => {
              if (isNext) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
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
