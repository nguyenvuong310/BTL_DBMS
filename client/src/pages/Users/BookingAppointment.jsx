import Header from "../../components/Header";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Typography, Button, Avatar, Input } from "@material-tailwind/react";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import {
  handleGetInforDoctor,
  handleGetDoctorSchedule,
  handleGetDoctorScheduleNow,
  handleGetFeedback,
} from "../../service/doctorService";
import { FaStar } from "react-icons/fa";

import {
  getUserFromLocalStorage,
  hanleBookAppointment,
  hanldlePostFeedback,
} from "../../service/userService";
const user = getUserFromLocalStorage();

const RatingModal = ({ isOpenModal, setIsOpenModal, handleSubmit }) => {
  const [rating, setRating] = useState(0); // For storing selected rating
  const [hover, setHover] = useState(0); // For hover effect on stars
  const [comment, setComment] = useState(""); // For storing comment

  if (!isOpenModal) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        {/* Title */}
        <Typography
          variant="h5"
          className="mb-4 text-center font-bold"
          style={{
            color: "#3e83f8",
          }}
        >
          Đánh giá & nhận xét
        </Typography>

        {/* Star Rating */}
        <div className="mb-6 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-2xl ${
                star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              <FaStar />
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div className="mb-6">
          <Typography
            variant="body1"
            className="mb-2 font-bold"
            style={{
              color: "#3e83f8",
            }}
          >
            Bình luận của bạn
          </Typography>
          <textarea
            rows="4"
            className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Viết bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsOpenModal(false)}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit(rating, comment); // Pass rating and comment to parent
              setIsOpenModal(false); // Close modal after submitting
            }}
            style={{
              backgroundColor: "#3e83f8", // Set background color
              color: "white", // Set text color
              padding: "10px 20px", // Add padding
              borderRadius: "8px", // Rounded corners
            }}
          >
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
};
const AlertModal = ({ setModalOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <Typography variant="h6" color="red" className="text-center">
          Vui lòng đăng nhập để đặt lịch hẹn.
        </Typography>
        <div className="mt-4 text-center">
          <Button
            className="mt-6 bg-blue-500 text-white"
            onClick={() => navigate("/login")} // Redirect to login page
          >
            Đăng nhập
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
      </div>
    </>
  );
};

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});
  const [doctorSchedules, setDoctorSchedule] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [feedback, setFeedback] = useState({});
  const [feedbackCount, setFeedbackCount] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [reason, setReason] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [isOpenModalComment, setIsOpenModalComment] = useState(false);

  const handleChange = async (selectedOption) => {
    setSelectedDate(selectedOption);
    const doctorSchedules = await handleGetDoctorSchedule(
      doctorId,
      selectedOption.value,
    );
    setDoctorSchedule(doctorSchedules.data.data);
  };

  const handleBooking = async () => {
    const data = {
      scheduleId: scheduleId,
      reason: reason,
    };
    toast.success("Bạn đã đặt lịch hẹn thành công");
    await hanleBookAppointment(data);
    setModalOpen(false);
  };

  const handleClickTime = (scheduleId) => {
    setModalOpen(true);
    setScheduleId(scheduleId);
  };
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctor = await handleGetInforDoctor(doctorId);
        setDoctor(doctor.data.data);
        const options = await handleGetDoctorScheduleNow(doctorId);
        if (options.data.data.length > 0) {
          setDateOptions(options.data.data);
          setSelectedDate(options.data.data[0]);
          const doctorSchedules = await handleGetDoctorSchedule(
            doctorId,
            options.data.data[0].value,
          );

          setDoctorSchedule(doctorSchedules.data.data);
        }

        const feedback = await handleGetFeedback(doctorId);
        setFeedback(feedback.data.data);
        const feedbackCount = [
          feedback.data.data?.meta?.fiveStar,
          feedback.data.data?.meta?.fourStar,
          feedback.data.data?.meta?.threeStar,
          feedback.data.data?.meta?.twoStar,
          feedback.data.data?.meta?.oneStar,
        ];
        setFeedbacks(feedback.data.data?.items);
        setFeedbackCount(feedbackCount);
      } catch (error) {
        console.error("Error fetching doctor information:", error);
      }
    };

    fetchDoctorInfo();
  }, []);

  // // useEffect(() => {}, [doctorSchedules]);
  // if (!selectedDate || dateOptions.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const handleSubmit = async (rating, comment) => {
    const data = {
      rating: rating,
      comment: comment,
    };
    const res = await hanldlePostFeedback(doctorId, data);
    if (res.status === 201) {
      toast.success("Cảm ơn bạn đã đánh giá");
    }
  };
  return (
    <>
      {/* <div>
        {" "}
        <NotificationContainer />
      </div> */}

      <div className="mx-auto max-w-screen-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center">
          <img
            className="h-24 w-24 rounded-full border"
            src={doctor.avatar}
            alt="Doctor Profile"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <Typography color="gray" className="mt-2">
              <span dangerouslySetInnerHTML={{ __html: doctor.bio }}></span>
            </Typography>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mt-6">
            <h3 className="text-lg font-semibold">LỊCH KHÁM</h3>
            <div className="mb-2 w-48 text-gray-600">
              <Select
                defaultValue={selectedDate}
                onChange={handleChange}
                options={dateOptions}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {doctorSchedules.map((time, index) => (
                <button
                  key={index}
                  className="rounded border px-4 py-2 text-sm hover:bg-blue-100"
                  onClick={() => handleClickTime(time.id)}
                >
                  {time.start_time} - {time.end_time}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {user ? ( // Check if the user exists
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Lý do khám
                    </Typography>

                    <Input
                      size="lg"
                      placeholder="Vui lòng nhập lý do khám"
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
                      onClick={handleBooking}
                    >
                      Đặt lịch hẹn
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
            ) : (
              <AlertModal setModalOpen={setModalOpen} />
            )}
          </div>
        )}
        {isOpenModalComment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {user ? (
              <RatingModal
                isOpenModal={isOpenModalComment}
                setIsOpenModal={setIsOpenModalComment}
                handleSubmit={handleSubmit}
              />
            ) : (
              <AlertModal setModalOpen={setIsOpenModalComment} />
            )}
          </div>
        )}

        {/* Rating Section */}
        <div className="mt-8 rounded-lg bg-gray-100 p-4">
          <h3 className="text-lg font-semibold">Đánh giá & nhận xét</h3>
          <div className="my-4 flex items-center">
            <div className="text-black-500 text-4xl font-bold">4.9/5</div>
            <div className="ml-4">
              <div className="flex items-center">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="ml-2 cursor-pointer text-blue-500 underline">
                  {feedback?.meta?.totalComments} đánh giá
                </span>
              </div>

              <div className="mt-2 flex flex-col space-y-1">
                {feedbackCount.map((count, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="text-sm">{5 - index} ⭐</div>
                    <div className="h-2 flex-1 rounded bg-gray-200">
                      <div
                        className="h-2 rounded bg-blue-300"
                        style={{ width: `${(count / 36) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm">{count} đánh giá</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-20 items-center justify-center border-b border-t border-gray-300">
            <Button
              onClick={() => setIsOpenModalComment(!isOpenModalComment)}
              style={{
                backgroundColor: "#3e83f8", // Set background color
                color: "white", // Set text color
                padding: "10px 20px", // Add padding
                borderRadius: "8px", // Rounded corners
              }}
            >
              Đánh giá ngay
            </Button>
          </div>
          <div className="mx-auto max-w-3xl p-4">
            {/* Review Cards */}
            <div className="space-y-6">
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 pb-4 last:border-b-0"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="">
                      <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        withBorder={true}
                        color="blue-gray"
                        className=" p-0.5"
                        src="https://cdn-icons-png.flaticon.com/512/17002/17002124.png"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        {feedback.feedbacker.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {feedback.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="mt-2 flex items-center">
                    {"⭐".repeat(feedback.rating)}
                  </div>

                  {/* Comment */}
                  <p className="mt-2 text-sm">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BookingAppointment = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role={user ? user.role : "main"} />
        <DoctorProfile />
      </div>
    </>
  );
};

export default BookingAppointment;
