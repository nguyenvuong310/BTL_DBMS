import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  "Date",
  "Location",
  "Doctor",
  "Speciality",
  "Reason",
  "Status",
  "",
];

const TABLE_ROWS = [
  {
    date: "Wed 3:00pm",
    location: "New York Clinic",
    doctor: "Dr. Sarah Johnson",
    speciality: "Cardiology",
    reason: "Routine Checkup",
    status: "Completed",
  },
  {
    date: "Wed 1:00pm",
    location: "Los Angeles Hospital",
    doctor: "Dr. Mark Spencer",
    speciality: "Orthopedics",
    reason: "Knee Pain",
    status: "Completed",
  },
  {
    date: "Mon 7:40pm",
    location: "San Francisco Medical Center",
    doctor: "Dr. Emily Davis",
    speciality: "Dermatology",
    reason: "Skin Rash",
    status: "Pending",
  },
  {
    date: "Wed 5:00pm",
    location: "Chicago Health Center",
    doctor: "Dr. James Wilson",
    speciality: "Neurology",
    reason: "Headache",
    status: "Completed",
  },
  {
    date: "Wed 3:30am",
    location: "Miami Clinic",
    doctor: "Dr. Olivia Brown",
    speciality: "Pediatrics",
    reason: "Child Fever",
    status: "Cancelled",
  },
];

export default function AppointmentHistory() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const starLabels = ["Rất Tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

  const renderStars = () => {
    return (
      <div className="flex justify-around">
        {starLabels.map((label, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center"
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setSelectedRating(index + 1)}
          >
            <span
              className={`text-3xl ${
                (hoverRating || selectedRating) > index
                  ? "text-yellow-300"
                  : "text-gray-400"
              }`}
            >
              ★
            </span>
            <span className="mt-1 text-sm">{label}</span>
          </div>
        ))}
      </div>
    );
  };
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
              {TABLE_ROWS.map(
                (
                  { date, location, doctor, speciality, reason, status },
                  index,
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={date}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {date}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {doctor}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {speciality}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {reason}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
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
                      <td className={classes}>
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
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black bg-opacity-50">
          <div className="w-[50vw] rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 font-semibold">Đánh giá</h3>
            {renderStars(selectedRating || hoverRating)}
            <div className=" mt-10">
              <Textarea label="Nội dung đánh giá" />
            </div>
            <div className="mt-4 text-right">
              {selectedRating > 0 && (
                <button
                  className="mr-5 rounded-lg bg-blue-500 px-4 py-2 text-white"
                  onClick={() => setModalOpen(false)}
                >
                  Đánh giá
                </button>
              )}
              <button
                className="rounded-lg bg-gray-200 px-4 py-2"
                onClick={() => {
                  setModalOpen(false);
                  setSelectedRating(0);
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
