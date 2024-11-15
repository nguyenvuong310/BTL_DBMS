import { dataSource } from '../config/orm.config';
import { Hospital } from '../../modules/hospitals/entities/hospital.entity';
import { Medicine } from '../../modules/medicine/entities/medicine.entity';
import { HostAddress } from 'typeorm';
import { Specialty } from '../../modules/specialty/entities/specialty.entity';

async function runSeed() {
  await dataSource.initialize();

  console.log('Seeding started');

  const hospitalRepository = dataSource.getRepository(Hospital);
  const medicineRepository = dataSource.getRepository(Medicine);
  const specialtyRepository = dataSource.getRepository(Specialty);

  const hospitals = [
    {
      name: 'Bệnh viện Đa khoa An Việt',
      address: 'Số 1E Trường Chinh - Thanh Xuân - Hà Nội',
    },
    {
      name: 'Bệnh viện Hữu nghị Việt Đức',
      address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/06/18/083122lo-go-viet-duc.jpg',
    },
    {
      name: 'Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn',
      address: 'Số 1, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2022/08/26/092249-doctor-check.jpg',
    },
    {
      name: 'Phòng khám Bệnh viện Đại học Y Dược 1',
      address: 'Số 215 Hồng Bàng, Phường 11, Quận 5, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2022/07/14/155206-logo-y-duoc-1.jpg',
    },
    {
      name: 'Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108',
      address: 'Số 1 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2019/07/31/085056logobenhvien108.jpg',
    },
    {
      name: 'Bệnh viện Ung bướu Hưng Việt',
      address: 'Số 2, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2023/05/16/153236-logo-hung-viet.jpg',
    },
    {
      name: 'Hệ thống y tế MEDLATEC',
      address: 'Số 14, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2022/08/29/104922-logo-med-tai-ha-noi--01.png',
    },
    {
      name: 'Trung tâm xét nghiệm Diag Laboratories',
      address: 'Số 1, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2022/06/23/160340-logo-diag.png',
    },
    {
      name: 'Hệ thống Y tế Thu Cúc TCI',
      address: 'Số 286, Đường Bà Triệu, Quận Hai Bà Trưng, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2021/04/07/103904-logo-thucuc.png',
    },
    {
      name: 'Bệnh viện Nam học và Hiếm muộn Hà Nội',
      address: 'Số 2, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2019/11/13/160343logo-nam-hoc-hn.jpg',
    },
    {
      name: 'Bệnh viện Đa khoa Hồng Phát',
      address: 'Số 1, Đường 3/2, Phường 11, Quận 10, TP.HCM',
      logo: 'https://cdn.bookingcare.vn/fo/2022/01/28/165735-logo-hong-phat.png',
    },
    {
      name: 'Bệnh viện Đa khoa An Việt',
      address: 'Số 1E Trường Chinh - Thanh Xuân - Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2024/07/18/114029-anh1.jpg',
    },
    {
      name: 'Bệnh viện Y học cổ truyền Trung ương ',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2020/06/05/160857-791310225786250729637925205413557167980544o.jpg',
    },
    {
      name: 'Bệnh viện Đa khoa Bảo Sơn 2',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/06/18/113555logo-benh-vien-bao-son.jpg',
    },
    {
      name: 'Hệ Thống phòng khám Vietlife ',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/06/18/143606logo-phong-kham-viet-life.png',
    },
    {
      name: 'Phòng khám Đa khoa Saigon Healthcare',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/05/12/101707-logo-sg.png',
    },
    {
      name: 'Bệnh viện Lão khoa Trung ương',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/07/02/175558benh-vien-lao-khoa-lo-go-1.jpeg',
    },
    {
      name: 'Phòng khám Đa khoa Meditec',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/05/11/181208mediteclogo.jpeg',
    },
    {
      name: 'Bệnh viện STO Phương Đông',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/05/09/162239-logo-sto.jpg',
    },
    {
      name: 'Bệnh viện Mắt quốc tế DND',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2019/09/25/143306logp-bv-mat-dnd.jpg',
    },
    {
      name: 'Bệnh viện Đa khoa Đông Đô',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/09/07/091211-logo-dong-do.jpg',
    },
    {
      name: 'Phòng khám Chuyên khoa Quốc tế Phổi Sài Gòn',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/11/17/090722-66caeee6ef7929277068.jpg',
    },
    {
      name: 'Phòng khám Đa khoa Quốc tế Golden Healthcare',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2021/03/16/112207-logo-golden-healthcarepng.png',
    },
    {
      name: 'Hệ thống Phòng khám Bác sĩ Gia đình Med247',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2023/07/26/100649-med247.jpg',
    },
    {
      name: 'Endo Clinic - Tiêu Hoá Khoẻ \u0026 Ngừa Ung Thư',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2024/04/03/084844-logo-mark.png',
    },
    {
      name: 'Viện Tư vấn Tâm lý SunnyCare',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2021/04/16/111242-logosunnycare.png',
    },
    {
      name: 'Bệnh viện Thanh Nhàn',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/07/04/082417logo.png',
    },
    {
      name: 'Phòng Khám ACC - Chiropractic Quận 1 TP.HCM',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/09/16/165334-logoacc.png',
    },
    {
      name: 'Bệnh viện Bệnh Nhiệt đới Trung ương',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2018/08/06/110134logo-nhtd.jpg',
    },
    {
      name: 'Phòng Khám ACC - Chiropractic Hà Nội',
      address: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
      logo: 'https://cdn.bookingcare.vn/fo/2022/11/22/113735-logoacc.png',
    },
  ];
  if ((await hospitalRepository.count()) === 0) await hospitalRepository.save(hospitals);

  const medicines = [
    { name: 'Aspirin' },
    { name: 'Ibuprofen' },
    { name: 'Paracetamol' },
    { name: 'Amoxicillin' },
    { name: 'Metformin' },
    { name: 'Lisinopril' },
    { name: 'Atorvastatin' },
    { name: 'Omeprazole' },
    { name: 'Levothyroxine' },
    { name: 'Simvastatin' },
    { name: 'Losartan' },
    { name: 'Alprazolam' },
    { name: 'Diazepam' },
    { name: 'Furosemide' },
    { name: 'Hydrochlorothiazide' },
    { name: 'Gabapentin' },
    { name: 'Clopidogrel' },
    { name: 'Sildenafil' },
    { name: 'Ciprofloxacin' },
    { name: 'Fluoxetine' },
    { name: 'Prednisone' },
    { name: 'Tamsulosin' },
    { name: 'Tramadol' },
    { name: 'Cetirizine' },
    { name: 'Diphenhydramine' },
    { name: 'Clonazepam' },
    { name: 'Warfarin' },
    { name: 'Hydrocodone' },
    { name: 'Loratadine' },
    { name: 'Sertraline' },
    { name: 'Fluconazole' },
    { name: 'Ezetimibe' },
    { name: 'Doxycycline' },
    { name: 'Ranitidine' },
    { name: 'Azithromycin' },
    { name: 'Bupropion' },
    { name: 'Latanoprost' },
    { name: 'Propranolol' },
    { name: 'Naproxen' },
    { name: 'Methylprednisolone' },
  ];

  if ((await medicineRepository.count()) === 0) await medicineRepository.save(medicines);

  const specialties = [
    { name: 'Cơ Xương Khớp', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-co-xuong-khop.png' },
    { name: 'Thần kinh', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-than-kinh.png' },
    { name: 'Tiêu hoá', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-tieu-hoa.png' },
    { name: 'Tim mạch', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-tim-mach.png' },
    { name: 'Tai Mũi Họng', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-tai-mui-hong.png' },
    { name: 'Cột sống', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-cot-song.png' },
    { name: 'Y học Cổ truyền', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-y-hoc-co-truyen.png' },
    { name: 'Châm cứu', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-cham-cuu.png' },
    { name: 'Sản Phụ khoa', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-san-phu-khoa.png' },
    { name: 'Siêu âm thai', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-sieu-am-thai.png' },
    { name: 'Nhi khoa', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nhi-khoa.png' },
    { name: 'Da liễu', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101638-da-lieu.png' },
    { name: 'Bệnh Viêm gan', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-viem-gan.png' },
    { name: 'Sức khỏe tâm thần', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-suc-khoe-tam-than.png' },
    { name: 'Dị ứng miễn dịch', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101638-di-ung-mien-dich.png' },
    { name: 'Hô hấp - Phổi', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101638-ho-hap-phoi.png' },
    { name: 'Ngoại thần kinh', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-ngoai-than-kinh.png' },
    { name: 'Nam học', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nam-hoc.png' },
    { name: 'Chuyên khoa Mắt', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101638-mat.png' },
    { name: 'Thận - Tiết niệu', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-than-tiet-nieu.png' },
    { name: 'Nội khoa', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-noi-khoa.png' },
    { name: 'Nha khoa', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nha-khoa.png' },
    { name: 'Tiểu đường - Nội tiết', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-tieu-duong.png' },
    { name: 'Phục hồi chức năng', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-phuc-hoi-chuc-nang.png' },
    { name: 'Chụp Cộng hưởng từ', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-cong-huong-tu.png' },
    { name: 'Chụp cắt lớp vi tính', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-chup-cat-lop.png' },
    { name: 'Nội soi Tiêu hóa', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-noi-soi-tieu-hoa.png' },
    { name: 'Ung bướu', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-ung-buou.png' },
    { name: 'Da liễu thẩm mỹ', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101638-da-lieu-tham-my.png' },
    { name: 'Truyền nhiễm', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-truyen-nhiem.png' },
    { name: 'Bác sĩ gia đình', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-bac-si-gia-dinh.png' },
    { name: 'Tạo hình Hàm Mặt', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101713-tao-hinh-ham-mat.png' },
    { name: 'Tư vấn, trị liệu Tâm lý', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-tu-van-tam-ly.png' },
    { name: 'Vô sinh - Hiếm muộn', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-vo-sinh-hiem-muon.png' },
    {
      name: 'Chấn thương chỉnh hình',
      logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-chan-thuong-chinh-hinh.png',
    },
    { name: 'Niềng răng', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nieng-rang.png' },
    { name: 'Bọc răng sứ', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101627-boc-rang-su.png' },
    { name: 'Trồng răng implant', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-trong-rang.png' },
    { name: 'Nhổ răng khôn', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nho-rang-khon.png' },
    { name: 'Nha khoa tổng quát', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/104709-nha-khoa-tong-quat.png' },
    { name: 'Nha khoa trẻ em', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-nha-khoa-tre-em.png' },
    { name: 'Tuyến giáp', logo: 'https://cdn.bookingcare.vn/fo/2023/12/26/101739-tuyen-giap.png' },
    { name: 'Chuyên khoa Vú', logo: 'https://cdn.bookingcare.vn/fo/2024/10/16/115336-vu.png' },
  ];

  if ((await specialtyRepository.count()) === 0) await specialtyRepository.save(specialties);

  console.log('Seeding complete');
  await dataSource.destroy();
}

runSeed().catch((error) => {
  console.error('Error during seeding:', error);
});
