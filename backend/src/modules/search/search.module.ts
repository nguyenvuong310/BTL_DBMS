import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HospitalsModule } from '../hospitals/hospitals.module';
import { SpecialtyModule } from '../specialty/specialty.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [HospitalsModule, SpecialtyModule, DoctorsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
