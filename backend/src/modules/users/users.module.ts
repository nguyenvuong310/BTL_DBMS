import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
@Module({
  imports: [DoctorsModule, PatientsModule],
  // controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
