import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { handleGetAllMedine } from "../service/medicineService";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { handlePrescription } from "../service/doctorService";
import { toast } from "react-toastify";

const TimePopup = ({ isOpen, onClose, appointmentId }) => {
  const [medicines, setMedicines] = useState([]);
  const [formEntries, setFormEntries] = useState([
    {
      medicine: "",
      dosage: "",
      quantity: "",
      times: { morning: false, afternoon: false, evening: false },
    },
  ]);

  const handleOnClose = () => {
    onClose();
    setFormEntries([
      {
        medicine: "",
        dosage: "",
        quantity: "",
        times: { morning: false, afternoon: false, evening: false },
      },
    ]);
  };

  // Fetch medicines whenever countField changes
  useEffect(() => {
    const fetchMedicines = async () => {
      const medicineIds = formEntries
        .filter((entry) => entry.medicine !== "")
        .map((entry) => entry.medicine)
        .join(",");
      const res = await handleGetAllMedine(medicineIds);
      setMedicines(res.data.data);
    };
    fetchMedicines();
  }, []);

  // Add a new form entry
  const handleAddEntry = () => {
    setFormEntries((prevEntries) => [
      ...prevEntries,
      {
        medicine: "",
        dosage: "",
        quantity: "",
        times: { morning: false, afternoon: false, evening: false },
      },
    ]);
  };

  // Handle changes to input fields
  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...formEntries];
    updatedEntries[index][field] = value;
    setFormEntries(updatedEntries);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (index, time) => {
    const updatedEntries = [...formEntries];
    updatedEntries[index].times[time] = !updatedEntries[index].times[time];
    setFormEntries(updatedEntries);
  };

  // Save the data
  const handleSave = async () => {
    if (
      formEntries.some(
        (entry) =>
          !entry.medicine ||
          !entry.dosage ||
          !entry.quantity ||
          !Object.values(entry.times).some((time) => time === true),
      )
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const prescriptionItems = formEntries.map((entry) => {
      const selectedTimes = [];

      Object.keys(entry.times).forEach((timeKey) => {
        if (entry.times[timeKey]) {
          selectedTimes.push(timeKey.toUpperCase());
        }
      });

      // Return the formatted prescription item
      return {
        medicineId: entry.medicine,
        dosage: entry.quantity + " " + entry.dosage,
        status: selectedTimes,
      };
    });
    console.log(prescriptionItems);
    console.log(appointmentId);
    const data = {
      appointmentId: appointmentId,
      prescriptionItems: prescriptionItems,
    };
    const res = await handlePrescription(data);
    if (res.status === 201) {
      toast("Ban da ke thuoc thanh cong");
      handleOnClose();
      return;
    }
    toast.error("Co loi xay ra, vui long thu lai");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[75vh] w-11/12 max-w-3xl overflow-y-auto rounded bg-white p-6">
        {/* Select Medicine */}
        <h2 className="mb-4 text-xl font-bold">Kê thuốc</h2>

        <div className=" ">
          {formEntries.map((entry, index) => (
            <div className="mb-4 flex flex-wrap gap-4" key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Chọn thuốc
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={entry.medicine}
                  onChange={(e) =>
                    handleInputChange(index, "medicine", e.target.value)
                  }
                >
                  <option value="">-- Chọn thuốc --</option>
                  {medicines.map((medicine) => {
                    return (
                      <option key={medicine.id} value={medicine.id}>
                        {medicine.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số lượng
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nhập số lượng"
                  value={entry.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Liều lượng
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={entry.dosage}
                  onChange={(e) =>
                    handleInputChange(index, "dosage", e.target.value)
                  }
                >
                  <option value="">-- Chọn liều lượng --</option>
                  <option value="Viên">Viên</option>
                  <option value="Gói">Gói</option>
                  <option value="mg">mg</option>
                </select>
              </div>
              {["morning", "afternoon", "evening"].map((time) => (
                <div key={time}>
                  <label className="block text-sm font-medium text-gray-700">
                    {time === "morning"
                      ? "Sáng"
                      : time === "afternoon"
                        ? "Trưa"
                        : "Chiều"}
                  </label>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={entry.times[time]}
                    onChange={() => handleCheckboxChange(index, time)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex items-center justify-center">
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition duration-300 hover:scale-110 hover:bg-blue-600"
            onClick={handleAddEntry}
          >
            <PlusIcon className="h-6 w-6 font-bold" />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={handleOnClose}
          >
            Hủy
          </button>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalPrescription = ({ appointmentId }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);
  console.log(appointmentId, "hi");
  return (
    <>
      <div onClick={() => handleOpenPopup()}>
        <DocumentIcon className="h-4 w-4" />
        {/* Popup Modals */}
      </div>
      <TimePopup
        isOpen={openPopup}
        onClose={handleClosePopup}
        appointmentId={appointmentId}
      />
    </>
  );
};
