import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  findAll() {
    return this.medicineService.findAll();
  }
}
