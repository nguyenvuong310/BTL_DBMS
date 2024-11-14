// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { HealthInsuranceService } from './health_insurance.service';
// import { CreateHealthInsuranceDto } from './dto/create-health_insurance.dto';
// import { UpdateHealthInsuranceDto } from './dto/update-health_insurance.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Health Insurance')
// @Controller('health-insurance')
// export class HealthInsuranceController {
//   constructor(private readonly healthInsuranceService: HealthInsuranceService) {}

//   @Post()
//   create(@Body() createHealthInsuranceDto: CreateHealthInsuranceDto) {
//     return this.healthInsuranceService.create(createHealthInsuranceDto);
//   }

//   @Get()
//   findAll() {
//     return this.healthInsuranceService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.healthInsuranceService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateHealthInsuranceDto: UpdateHealthInsuranceDto) {
//     return this.healthInsuranceService.update(+id, updateHealthInsuranceDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.healthInsuranceService.remove(+id);
//   }
// }
