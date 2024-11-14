import { Module } from '@nestjs/common';
import { HealthInsuranceService } from './health_insurance.service';
// import { HealthInsuranceController } from './health_insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthInsurance } from './entities/health_insurance.entity';
import { HealthInsuranceRepository } from './health_insurance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HealthInsurance])],
  // controllers: [HealthInsuranceController],
  providers: [HealthInsuranceService, HealthInsuranceRepository],
  exports: [HealthInsuranceService],
})
export class HealthInsuranceModule {}
