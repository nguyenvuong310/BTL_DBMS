import React from "react";
import Header from "../../components/Header";
import {
  Carousel,
  Typography,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { specialties, hospitalLocations, doctors } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const DoctorProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const reviews = [
    {
      avatar: "H",
      name: "Huỳnh Mộng",
      date: "13/10/2024 03:39",
      rating: 5,

      comment: "Chuẩn đoán bệnh chính xác, tư vấn tận tình",
    },
    {
      avatar: "V",
      name: "voduc thanh",
      date: "11/10/2023 14:49",
      rating: 5,

      comment: "Bác sĩ nhiệt tình, tận tâm",
    },
    {
      avatar: "Đ",
      name: "Đức Đỗ",
      date: "7/9/2023 02:28",
      rating: 5,

      comment: "Bác sĩ tận tình, chu đáo",
    },
  ];
  return (
    <div className="mx-auto max-w-screen-lg rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center">
        <img
          className="h-24 w-24 rounded-full border"
          src="https://cdn-icons-png.flaticon.com/512/3304/3304567.png "
          alt="Doctor Profile"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">
            Thạc sĩ, Bác sĩ Phạm Thị Quỳnh
          </h2>
          <p className="text-gray-600">Nguyên Trưởng khoa Sản, Bệnh viện E</p>
          <p className="text-gray-600">
            Tốt nghiệp Bác sĩ Y khoa tại Đại học Y Rostov sông Đông - Liên Xô cũ
          </p>
          <p className="text-gray-600">Nhận khám từ 15 tuổi trở lên</p>
          <p className="mt-1 flex items-center text-gray-600">
            <span className="material-icons mr-1 text-gray-400">
              location_on
            </span>{" "}
            Hà Nội
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mt-6">
          <h3 className="text-lg font-semibold">LỊCH KHÁM</h3>
          <p className="mb-2 text-gray-600">Thứ 5 - 14/11</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              "08:00 - 08:30",
              "08:15 - 08:45",
              "08:30 - 09:00",
              "08:45 - 09:15",
              "09:00 - 09:30",
              "09:30 - 10:00",
              "10:00 - 10:30",
              "10:30 - 11:00",
              "11:00 - 11:30",
              "13:30 - 14:00",
              "14:00 - 14:30",
              "14:30 - 15:00",
              "15:00 - 15:30",
              "15:30 - 16:00",
              "16:00 - 16:30",
            ].map((time, index) => (
              <button
                key={index}
                className="rounded border px-4 py-2 text-sm hover:bg-blue-100"
                onClick={() => setModalOpen(true)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black bg-opacity-50">
          <div className=" rounded-lg bg-white p-6 shadow-lg ">
            <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Họ và tên bệnh nhân
                </Typography>

                <Input
                  size="lg"
                  placeholder="Họ và tên"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="-m-3 flex w-max gap-4">
                  <Checkbox color="blue" label="Nam" />
                  <Checkbox color="blue" label="Nữ" />
                </div>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Số điện thoại
                </Typography>
                <Input
                  size="lg"
                  placeholder="0123456789"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Số bảo hiểm xã hội
                </Typography>
                <Input
                  size="lg"
                  placeholder="0123456789"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="mt-4 text-right">
                <Button className="mt-6 bg-blue-500 text-white">
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
                36 đánh giá
              </span>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              {[33, 3, 0, 0, 0].map((count, index) => (
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
        <div className="mx-auto max-w-3xl p-4">
          {/* Review Cards */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4 last:border-b-0"
              >
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mt-2 flex items-center">
                  {"⭐".repeat(review.rating)}
                </div>

                {/* Comment */}
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingAppointment = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role="user" />
        <DoctorProfile />
      </div>
    </>
  );
};

export default BookingAppointment;
