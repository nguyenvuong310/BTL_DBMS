import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Carousel,
  Typography,
  Button,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import Header from "../../components/Header";
import { toast } from "react-toastify";

import { getUserFromLocalStorage } from "../../service/userService";
import {
  getAllScheduleDoctor,
  handleCreateSchedule,
} from "../../service/doctorService";
import { useEffect, useState } from "react";

const user = getUserFromLocalStorage();
export const CreateSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await getAllScheduleDoctor(); // Use the updated current page
        setSchedules(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule doctor by doctor:", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleCreateEvent = async () => {
    const date = new Date(`${day}T00:00:00Z`);

    const data = {
      day: date,
      start_time: startTime,
      end_time: endTime,
      max_slots: 10,
    };
    try {
      const response = await handleCreateSchedule(data);

      if (response.status === 201) {
        setSchedules([...schedules, response.data.data]);
        toast.success("Tạo lịch thành công");
      }
    } catch (error) {
      if (error.response) {
        if (
          Array.isArray(error.response.data.message) &&
          error.response.data.message.length > 0
        ) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error(error.response.data.message);
        }
      }
      toast.error("Tạo lịch không thành công, vui lòng thử lại");
    }
  };

  return (
    <>
      <Header role={user ? user.role : "main"} />
      <div className="flex h-screen gap-8 p-10">
        {" "}
        {/* Add h-screen to fill the viewport height */}
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-3">
            Tạo lịch khám
          </Typography>
          <div
            style={{
              width: "500px",
              height: "400px",
              border: "2px solid #dddddd",
            }}
          >
            <div className="mb-1 mt-2 flex flex-col gap-6 p-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Ngày
              </Typography>

              <Input
                size="lg"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="date"
              />
            </div>
            <div className="flex gap-8">
              <div className="mb-1 mt-2 flex flex-col gap-6 p-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Thời gian bắt đầu
                </Typography>

                <Input
                  size="lg"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type="time"
                />
              </div>
              <div className="mb-1 mt-2 flex flex-col gap-6 p-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Thời gian kết thúc
                </Typography>

                <Input
                  size="lg"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type="time"
                  step="600"
                  min="00:10"
                />
              </div>
            </div>
            <div className="mt-3 px-4 text-right">
              <Button
                className="mt-6"
                style={{
                  backgroundColor: "#2c3e50",
                  color: "#ffffff",
                }}
                onClick={() => handleCreateEvent()}
              >
                Tạo lịch
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 py-4">
          {" "}
          {/* flex-1 makes this div take the remaining space */}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridDay,timeGridWeek",
            }}
            events={schedules}
            contentHeight="auto" // This ensures FullCalendar adjusts its height automatically
            slotMinTime="07:00:00" // Start time for the displayed range
            slotMaxTime="22:00:00" // End time for the displayed range
          />
        </div>
      </div>
    </>
  );
};
