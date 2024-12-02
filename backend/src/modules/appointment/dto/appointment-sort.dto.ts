export class AppointmentSortDto {
  doctorName?: 'ASC' | 'DESC' | null;

  createdAt?: 'ASC' | 'DESC' | null;

  date?: 'ASC' | 'DESC' | null;

  time?: 'ASC' | 'DESC' | null;

  hospitalName?: 'ASC' | 'DESC' | null;

  constructor(sort: string) {
    if (!sort) {
      return;
    }
    const sortJson = JSON.parse(sort);

    this.doctorName = sortJson?.doctorName || null;
    this.createdAt = sortJson?.createdAt || null;
    this.date = sortJson?.date || null;
    this.time = sortJson?.time || null;
    this.hospitalName = sortJson?.hospitalName || null;
  }
}
