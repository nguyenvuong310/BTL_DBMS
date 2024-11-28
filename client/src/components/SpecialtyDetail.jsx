import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import Header from "./Header";
import { useState, useEffect } from "react";
const SpecialistCard = ({ name, description, image }) => (
  <Card className="mb-4 flex flex-row items-center p-4">
    <Avatar src={image} alt={name} className="mr-4 h-24 w-24" />
    <div>
      <Typography variant="h6" color="blue-gray">
        {name}
      </Typography>
      <Typography color="gray" className="mt-2">
        {description}
      </Typography>
      <Button color="blue" size="sm" className="mt-4">
        Xem thêm
      </Button>
    </div>
  </Card>
);

const ArticleCard = ({ title, description, image }) => (
  <Card className="mb-4 flex flex-row items-center p-4">
    <img src={image} alt={title} className="mr-4 h-24 w-24 object-cover" />
    <div>
      <Typography variant="h6" color="blue-gray">
        {title}
      </Typography>
      <Typography color="gray" className="mt-2">
        {description}
      </Typography>
      <Button color="blue" size="sm" className="mt-4">
        Đọc thêm
      </Button>
    </div>
  </Card>
);

const SpecialtyDetail = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const url = window.location.href; // Get the full URL
    const uuid = url.split("/").pop(); // Extract the last part of the URL
    console.log(uuid); // Outputs: 125e38be-5bb3-4a85-90b6-b23f3dec1ec0

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setRole(userData.role);
    }
  }, []);
  const specialists = [
    {
      name: "Tiến sĩ, Bác sĩ chuyên khoa II Lê Quốc Việt",
      description:
        "Hơn 30 năm kinh nghiệm khám và điều trị các bệnh nội cơ xương khớp và 40 năm kinh nghiệm khám Nội tổng quát. Nguyên Phó Giám đốc Bệnh viện E. Bác sĩ nhận khám bệnh nhân từ 4 tuổi trở lên.",
      image: "path_to_image_1.jpg",
    },
    {
      name: "BSCKII Dương Minh Trí",
      description:
        "Trưởng khoa Nội Cơ Xương Khớp, Bệnh viện Nhân dân Gia Định. Nhiều năm kinh nghiệm trong khám và điều trị bệnh lý về Nội Cơ xương khớp. Bác sĩ nhận khám cho bệnh nhân từ 16 tuổi trở lên.",
      image: "path_to_image_2.jpg",
    },
    // Add more specialists as needed
  ];

  const articles = [
    {
      title: "8 bệnh viện, phòng khám Cơ xương khớp uy tín tại TP.HCM (Phần 1)",
      description:
        "Danh sách các bệnh viện và phòng khám uy tín chuyên về Cơ xương khớp tại TP.HCM.",
      image: "path_to_article_image_1.jpg",
    },
    {
      title: "8 bác sĩ khám chữa xương khớp giỏi tại TP HCM (phần 1)",
      description:
        "Danh sách các bác sĩ chuyên khoa Cơ xương khớp giỏi tại TP.HCM.",
      image: "path_to_article_image_2.jpg",
    },
    // Add more articles as needed
  ];

  return (
    <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <Header role={role !== "" ? role : "main"} />
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <header className="my-8 text-center">
          <Typography variant="h2" color="blue-gray">
            Khám chuyên khoa Cơ Xương Khớp
          </Typography>
        </header>
        <section>
          <h2 className="text-justify ">
            <span className="text-lg">
              <b>Bác sĩ Thần kinh giỏi</b>
            </span>
          </h2>
          <p className="text-justify ">
            <span className="text-sm">
              Danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:
            </span>
          </p>
          <ul className="list-disc">
            <li className="text-justify ">
              Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và
              đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh
              viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh
              viện 103.
            </li>
            <li className="text-justify ">
              <span className="text-sm">
                Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần
                kinh Việt Nam, Hội Phẫu thuật Thần kinh...
              </span>
              <br />
            </li>
            <li className="text-justify ">
              <span className="text-sm">
                Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy
                thuốc ưu tú, bác sĩ cao cấp.
              </span>
            </li>
          </ul>
          <h2 className="text-justify ">
            <span className="text-sm">
              <b>Khám bệnh chuyên khoa Thần kinh</b>
            </span>
          </h2>
          <ul className="list-disc">
            <li className="text-justify ">
              <span className="text-sm">Bại Não</span>
              <span> </span>
              <span className="text-sm"> &nbsp;&nbsp;</span>
            </li>
            <li className="text-justify ">
              <span className="text-sm">Đau đầu, c</span>hóng mặt, buồn
              nôn&nbsp; &nbsp;
            </li>
            <li className="text-justify ">
              <span className="text-sm">Bệnh Pakison, b</span>ệnh tiền đình
              <span> </span>
              &nbsp; &nbsp;
            </li>
            <li className="text-justify ">
              <span className="text-sm">Bị co cơ, căng dây thần kinh</span>
              <span> </span>
              <span className="text-sm">&nbsp; &nbsp;</span>&nbsp;&nbsp; &nbsp;
            </li>
            <li className="text-justify ">
              Động kinh, có những cơn vãng ý thức
              <span> </span>
              &nbsp; &nbsp;
            </li>
            <li className="text-justify ">
              <span className="text-sm">Bị tê bì nửa mặt, c</span>hèn dây thần
              kinh
            </li>
            <li className="text-justify ">
              <span className="text-sm">Bồn chồn, lo lắng, hồi hộp, c</span>
              hân tay run
              <span> </span>
              &nbsp; &nbsp;
            </li>
            <li className="text-justify ">
              Có dấu hiệu tăng động
              <span> </span>
              &nbsp; &nbsp;&nbsp;
              <br />
            </li>
            <li className="text-justify ">
              Co rút cổ, đau đầu với mặt,&nbsp;chân tay, vã mồ hôi&nbsp; &nbsp;
              <br />
            </li>
            <li className="text-justify ">Chấn thương đầu, dây thần kinh</li>
            <li className="text-justify ">...</li>
          </ul>
        </section>
        {/* Introduction Section */}
        <section className="my-8">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Giới thiệu
              </Typography>
              <Typography color="gray">
                Chuyên khoa Cơ Xương Khớp chuyên khám và điều trị các bệnh lý
                liên quan đến hệ thống cơ, xương và khớp như: Gout, Thoái hóa
                khớp, Viêm khớp dạng thấp, Loãng xương, Viêm cơ, Teo cơ, và các
                chấn thương về cơ, xương, khớp.
              </Typography>
            </CardBody>
          </Card>
        </section>

        {/* Specialists Section */}
        <section className="my-8">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Bác sĩ Cơ Xương Khớp giỏi
          </Typography>
          {specialists.map((specialist, index) => (
            <SpecialistCard
              key={index}
              name={specialist.name}
              description={specialist.description}
              image={specialist.image}
            />
          ))}
        </section>

        {/* Articles Section */}
        <section className="my-8">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Bài viết liên quan
          </Typography>
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.image}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SpecialtyDetail;
