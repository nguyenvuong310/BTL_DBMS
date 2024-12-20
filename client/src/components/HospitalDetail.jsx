import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Header from "./Header";
import { handleGetInforHospital } from "../service/hospitalService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserFromLocalStorage } from "../service/userService";
const user = getUserFromLocalStorage();
const HospitalDetail = () => {
  const { hospitalId } = useParams();
  const [hospital, setHospital] = useState({});
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await handleGetInforHospital(hospitalId); // Use the updated current page
        setHospital(response.data.data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };

    fetchHospital();
  }, []);

  return (
    <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <Header role={user ? user?.role : "main"} />
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <header className="my-8 text-center">
          <Typography variant="h2" color="blue-gray">
            {hospital.name}
          </Typography>
          <Typography variant="h6" color="gray">
            {hospital.address}
          </Typography>
        </header>

        {/* Introduction Section */}
        <section className="my-8">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Giới thiệu
              </Typography>
              <Typography color="gray">
                Bệnh viện {hospital.name} với lịch sử thành lập trên 100 năm, là
                bệnh viện hạng đặc biệt tuyến Trung ương lớn nhất cả nước với
                trên 1.800 giường và trên 3.000 kỹ thuật y tế được thực hiện.
                Hàng ngày Bệnh viện {hospital.name} tiếp nhận trung bình 6,000 -
                8,000 bệnh nhân đến khám.
              </Typography>
            </CardBody>
          </Card>
        </section>

        {/* Specialties Section */}
        <section className="my-8">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Thế mạnh chuyên môn
              </Typography>
              <Typography color="gray">
                Bệnh viện có 05 Trung tâm và 38 Khoa Lâm sàng, bao gồm các
                chuyên khoa như:
              </Typography>
              <ul className="mt-4 list-inside list-disc text-gray-700">
                <li>Bệnh Thần kinh</li>
                <li>Bệnh Cơ xương khớp</li>
                <li>Bệnh tiêu hóa</li>
                <li>Tim mạch</li>
                <li>Phổi</li>
                <li>Thận</li>
                <li>Gan mật</li>
                <li>Thận - Tiết niệu</li>
                <li>Tai Mũi Họng</li>
                <li>Chấn thương chỉnh hình</li>
                <li>Mắt</li>
                <li>Bệnh truyền nhiễm</li>
                <li>Nội tiết</li>
              </ul>
            </CardBody>
          </Card>
        </section>

        {/* Appointment Booking Section */}
        <section className="my-8">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Đặt lịch hẹn
              </Typography>
              <Typography color="gray" className="mb-4">
                Để giảm thời gian chờ đợi và nhận được hướng dẫn đi khám tại
                Bệnh viện Chợ Rẫy, người bệnh vui lòng:
              </Typography>
              <ul className="list-inside list-decimal text-gray-700">
                <li>Chọn chuyên khoa phù hợp cần đi khám</li>
                <li>Chọn thời gian đặt khám</li>
                <li>Đặt hẹn online trước khi đến khám</li>
              </ul>
              {/* <div className="mt-6 text-center">
                <Button color="blue" size="lg">
                  Đặt lịch hẹn ngay
                </Button>
              </div> */}
            </CardBody>
          </Card>
        </section>

        {/* Map Section */}
        <section className="my-8">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Vị trí
              </Typography>
              <div className="h-64 w-full">
                <iframe
                  title={hospital.name}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.676933048839!2d106.660982315334!3d10.759917992332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecf1b0b1b0b%3A0x7e2f8e8e8e8e8e8e!2sB%E1%BB%87nh%20vi%E1%BB%87n%20Ch%E1%BB%A3%20R%E1%BA%ABy!5e0!3m2!1svi!2s!4v1633072800000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HospitalDetail;
