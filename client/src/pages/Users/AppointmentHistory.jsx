import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
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
  Tooltip,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [cureentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const fetchAppointmentHistory = async () => {
  //     try {
  //       const response = await getAppointmentHistory(cureentPage);
  //       setAppointments(response.data.data.items);
  //       setMeta(response.data.data.meta);
  //     } catch (error) {
  //       console.error("Error fetching doctor information:", error);
  //     }
  //   };

  //   fetchAppointmentHistory();
  // }, []);

  useEffect(() => {
    const fetchAppointmentHistory = async () => {
      try {
        const response = await getAppointmentHistory(cureentPage); // Use the updated current page
        setAppointments(response.data.data.items);
        console.log("Appointment history:", response.data.data.items.length);
        setMeta(response.data.data.meta);
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      }
    };

    fetchAppointmentHistory();
  }, [cureentPage]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header role="user" />
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
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Tìm kiếm"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
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
                            status === "Completed"
                              ? "green"
                              : status === "Pending"
                                ? "amber"
                                : "red"
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {status === "Completed" ? (
                        <Tooltip content="Đánh giá ngay">
                          <IconButton
                            variant="text"
                            onClick={() => setModalOpen(true)}
                          >
                            <StarIcon className="h-4 w-4" color="yellow" />
                          </IconButton>
                        </Tooltip>
                      ) : status === "Pending" ? (
                        <Tooltip content="Hủy cuộc hẹn">
                          <IconButton variant="text">
                            <TrashIcon className="h-4 w-4" color="red" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant={meta.isPrevious ? "filled" : "outlined"}
            color={meta.isPrevious ? "blue" : "gray"}
            size="sm"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              {cureentPage}
            </IconButton>
          </div>
          <Button
            variant={meta.isNext ? "filled" : "outlined"}
            color={meta.isNext ? "blue" : "gray"}
            size="sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
