import { Module } from '@nestjs/common';
import { PrescriptionItemsService } from './prescription_items.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionItem } from './entities/prescription_item.entity';
import { PrescriptionItemsRepository } from './prescription_items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionItem])],
  // controllers: [PrescriptionItemsController],
  providers: [PrescriptionItemsService, PrescriptionItemsRepository],
  exports: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}
