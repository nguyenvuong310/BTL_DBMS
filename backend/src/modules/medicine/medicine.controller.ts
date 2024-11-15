import { Controller, Get, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  @Public()
  @ApiQuery({
    name: 'excludeIds',
    required: false,
    description: 'Comma-separated list of medicine IDs to exclude',
    type: String,
  })
  @ApiOperation({ summary: 'Get all medicines' })
  findAll(@Query('excludeIds') excludeIds: string) {
    const ids = excludeIds ? excludeIds.split(',') : [];
    return this.medicineService.findAll(ids);
  }
}
