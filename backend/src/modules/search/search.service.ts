import { Inject, Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { SpecialtyService } from '../specialty/specialty.service';
import { HospitalsService } from '../hospitals/hospitals.service';
import { SearchType } from '../../constants/action.enum';
import { ReturnSearchDto } from './dto/return-search.dto';

@Injectable()
export class SearchService {
  constructor(
    @Inject(DoctorsService)
    private doctorService: DoctorsService,
    @Inject(SpecialtyService)
    private specialtyService: SpecialtyService,
    @Inject(HospitalsService)
    private hospitalService: HospitalsService,
  ) {}

  async findAllByType(searchType: string, search: string) {
    switch (searchType) {
      case SearchType.DOCTOR:
        return new ReturnSearchDto(await this.doctorService.searchDoctorByEmailOrName(search), [], []);
      case SearchType.SPECIALTY:
        return new ReturnSearchDto([], [], await this.specialtyService.searchSpecialtyByName(search));
      case SearchType.HOSPITAL:
        return new ReturnSearchDto([], await this.hospitalService.searchHospitalByName(search), []);
      case SearchType.ALL:
        const doctors = await this.doctorService.searchDoctorByEmailOrName(search);
        const specialties = await this.specialtyService.searchSpecialtyByName(search);
        const hospitals = await this.hospitalService.searchHospitalByName(search);
        return new ReturnSearchDto(doctors, hospitals, specialties);
      default:
        return 'Invalid type';
    }
  }
}
