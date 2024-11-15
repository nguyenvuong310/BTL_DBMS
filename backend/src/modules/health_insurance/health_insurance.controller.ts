import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthInsuranceService } from './health_insurance.service';
import { CreateHealthInsuranceDto } from './dto/create-health_insurance.dto';
import { UpdateHealthInsuranceDto } from './dto/update-health_insurance.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { ResponseMessage } from '../../decorator/responseMessage.decorator';

@ApiTags('Health Insurance')
@Controller('health-insurance')
export class HealthInsuranceController {
  constructor(private readonly healthInsuranceService: HealthInsuranceService) {}

  @Post()
  @ApiOperation({ summary: "Create Health Insurance's patient" })
  create(@Body() createHealthInsuranceDto: CreateHealthInsuranceDto, @User() user: UserDto) {
    return this.healthInsuranceService.create(createHealthInsuranceDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get Health Insurance's patient by access token" })
  findAll(@User() user: UserDto) {
    return this.healthInsuranceService.findByUserId(user.id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateHealthInsuranceDto })
  @ApiOperation({ summary: "Update Health Insurance's patient" })
  update(@Param('id') id: string, @Body() updateHealthInsuranceDto: UpdateHealthInsuranceDto) {
    return this.healthInsuranceService.update(id, updateHealthInsuranceDto);
  }

  @Delete(':id')
  @ResponseMessage('Health insurance removed')
  @ApiOperation({ summary: "Remove Health Insurance's patient" })
  @ApiResponse({ status: 200, description: 'Health insurance removed' })
  remove(@Param('id') id: string) {
    return this.healthInsuranceService.remove(id);
  }
}
