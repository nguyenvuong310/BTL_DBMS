import { PageOptions } from '../../../custom/pagingOptions';
import { InfoAppointmentDto } from './info-appointment.dto';

export class AppointmentList {
  meta: PageOptions;

  items: InfoAppointmentDto[];
  constructor(pageSize: number, currentPage: number, totalItems: number, items: InfoAppointmentDto[]) {
    this.meta = new PageOptions(pageSize, currentPage, totalItems);
    this.items = items;
  }
}
