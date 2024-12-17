import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { handleGetAllMedine } from "../service/medicineService";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { handleGetPrescription } from "../service/userService";
import { toast } from "react-toastify";

const TimePopup = ({ isOpen, onClose, appointmentId }) => {
  const [prescriptionMornings, setPrescriptionMornings] = useState([]);
  const [prescriptionAfternoons, setPrescriptionAfternoons] = useState([]);
  const [prescriptionEvenings, setPrescriptionEvenings] = useState([]);
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      console.log("Appointment,", appointmentId);
      const res = await handleGetPrescription(appointmentId);
      console.log(res.data.data);

      setPrescriptionMornings(res.data.data.morning);
      setPrescriptionAfternoons(res.data.data.afternoon);
      setPrescriptionEvenings(res.data.data.evening);
      if (
        res.data.data.morning.length > 0 ||
        res.data.data.afternoon.length > 0 ||
        res.data.data.evening.length > 0
      ) {
        setIsExisting(true);
      }
    };
    fetchMedicines();
  }, [isExisting, appointmentId]);

  // Save the data

  if (!isOpen) return null;
  if (!isExisting)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="max-h-[75vh] w-11/12 max-w-lg overflow-y-auto rounded bg-white p-6">
          {/* Select Medicine */}
          <h2 className="mb-4 text-xl font-bold">Đơn thuốc</h2>
          <div className=" ">
            <div>Bạn chưa được kê thuốc</div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[75vh] w-11/12 max-w-lg overflow-y-auto rounded bg-white p-6">
        {/* Select Medicine */}
        <h2 className="mb-4 text-xl font-bold">Đơn thuốc</h2>
        <div className=" ">
          <h2 className="font-bold">Sáng</h2>
          {isExisting &&
            prescriptionMornings.map((prescription, index) => (
              <div className="mb-4 flex flex-wrap gap-4" key={index}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên thuốc
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.medicine_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Liều lượng
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.dosage} // Bind to prescription dosage
                  />
                </div>
              </div>
            ))}
        </div>
        <div className=" ">
          <h2 className="font-bold">Trưa</h2>
          {isExisting &&
            prescriptionAfternoons.map((prescription, index) => (
              <div className="mb-4 flex flex-wrap gap-4" key={index}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên thuốc
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.medicine_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Liều lượng
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.dosage} // Bind to prescription dosage
                  />
                </div>
              </div>
            ))}
        </div>
        <div className=" ">
          <h2 className="font-bold">Chiều</h2>
          {isExisting &&
            prescriptionEvenings.map((prescription, index) => (
              <div className="mb-4 flex flex-wrap gap-4" key={index}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên thuốc
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.medicine_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Liều lượng
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled
                    value={prescription.dosage} // Bind to prescription dosage
                  />
                </div>
              </div>
            ))}
        </div>
        {/* Buttons */}

        <div className="flex justify-end space-x-4">
          <button
            className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalPrescriptionUser = ({ appointmentId }) => {
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
