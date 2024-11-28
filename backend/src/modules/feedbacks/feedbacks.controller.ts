import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post(':doctorId')
  @ApiOperation({ summary: 'patient feedback for doctor' })
  create(@Param('doctorId') doctorId: string, @Body() createFeedbackDto: CreateFeedbackDto, @User() user: UserDto) {
    return this.feedbacksService.create(createFeedbackDto, doctorId, user?.id);
  }

  @Get(':doctorId')
  @ApiOperation({ summary: 'Get all feedbacks about doctor' })
  findFeedBackByDoctor(@Param('doctorId') doctorId: string) {
    return this.feedbacksService.getFeedBacksByDoctorId(doctorId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedbacks about me: role doctor' })
  findOne(@Param('id') id: string) {
    return 'this.feedbacksService.findOne(+id)';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return 'this.feedbacksService.update(+id, updateFeedbackDto)';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.feedbacksService.remove(+id);';
  }
}
