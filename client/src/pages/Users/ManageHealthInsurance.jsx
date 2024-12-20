import Header from "../../components/Header";
import {
  Carousel,
  Typography,
  Button,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";

import { PencilIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  getUserFromLocalStorage,
  handleGetHealthInsurance,
  handleUpdateOrCreateHealthInsurance,
} from "../../service/userService";

const user = getUserFromLocalStorage();
const HealthInsurance = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [healthInsurance, setHealthInsurance] = useState({});
  const [hasHealthInsurance, setHasHealthInsurance] = useState(false);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [placeOfRegistration, setPlaceOfRegistration] = useState("");

  const handleUpdateOrCreate = async () => {
    const data = {
      timeStart,
      timeEnd,
      birthDate,
      gender,
      insuranceNumber,
      placeOfRegistration,
    };
    const response = await handleUpdateOrCreateHealthInsurance(
      data,
      hasHealthInsurance,
      healthInsurance.id,
    );
    if (response.status === 200 || response.status === 201) {
      setHealthInsurance(response.data.data);
      setIsEdit(false);
      toast.success("Cập nhật thông tin bảo hiểm thành công");
    }
  };
  useEffect(() => {
    const fetchHealthInsurance = async () => {
      try {
        const response = await handleGetHealthInsurance();
        const healthInsurance = response.data.data;
        if (!healthInsurance) {
          setHasHealthInsurance(false);
          return;
        }
        setHealthInsurance(healthInsurance);
        setTimeStart(healthInsurance.timeStart);
        setTimeEnd(healthInsurance.timeEnd);
        setBirthDate(healthInsurance.birthDate);
        setGender(healthInsurance.gender);
        setInsuranceNumber(healthInsurance.insuranceNumber);
        setPlaceOfRegistration(healthInsurance.placeOfRegistration);
        setHasHealthInsurance(true);
      } catch (error) {
        console.error("Error fetching health insurance:", error);
      }
    };

    fetchHealthInsurance();
  }, []);

  return (
    <div className=" rounded-lg bg-white p-6 shadow-lg">
      <form className="mb-4 mt-2 w-80 max-w-screen-lg sm:w-[30rem] lg:w-[40rem]">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="-mb-3">
            Thời hạn có giá trị{" "}
          </Typography>

          <div className="group relative">
            <PencilIcon
              className="ml-auto h-5 w-5 cursor-pointer text-amber-500"
              onClick={() => setIsEdit(!isEdit)}
            />
            <div className="absolute left-1/2 mt-1 hidden -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs text-white group-hover:block">
              Chỉnh sửa
            </div>
          </div>
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 ">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Thời gian bắt đầu
              </Typography>

              <Input
                size="lg"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                placeholder="Vui lòng nhập thời gian bắt đầu"
                disabled={!isEdit}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Thời gian kết thúc
              </Typography>

              <Input
                size="lg"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                placeholder="Vui lòng nhập thời gian kết thúc"
                disabled={!isEdit}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-4">
          <hr
            className="mx-auto my-4 rounded border-0 "
            style={{ backgroundColor: "#b0bec5", height: "1px" }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Ngày sinh
          </Typography>

          <Input
            size="lg"
            value={healthInsurance.birthDate}
            placeholder="Vui lòng nhập ngày sinh"
            onChange={(e) => setBirthDate(e.target.value)}
            disabled={!isEdit}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Giới tính
          </Typography>

          <Input
            size="lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Vui lòng nhập giới tính"
            disabled={!isEdit}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Số thẻ bảo hiểm y tế
          </Typography>

          <Input
            size="lg"
            value={insuranceNumber}
            onChange={(e) => setInsuranceNumber(e.target.value)}
            placeholder="Vui lòng nhập số thẻ bảo hiểm y tế"
            disabled={!isEdit}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nơi ĐKKCB BĐ
          </Typography>

          <Input
            size="lg"
            value={placeOfRegistration}
            onChange={(e) => setPlaceOfRegistration(e.target.value)}
            placeholder="Vui lòng nhập nơi ĐKKCB BĐ"
            disabled={!isEdit}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {isEdit && (
          <div className="mt-6 text-right">
            <Button
              className="mt-6  bg-amber-500"
              onClick={handleUpdateOrCreate}
            >
              Cập nhật
            </Button>
            <Button
              className="ml-8 mt-6 bg-gray-200 text-gray-800"
              onClick={() => setIsEdit(false)}
            >
              Huỷ
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

const PageHealthInsurance = () => {
  return (
    <>
      <div className="h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <Header role={user ? user.role : "main"} />
        <div className="flex h-screen w-full flex-col items-center justify-center gap-12 p-8">
          <HealthInsurance />
        </div>
      </div>
    </>
  );
};

export default PageHealthInsurance;
