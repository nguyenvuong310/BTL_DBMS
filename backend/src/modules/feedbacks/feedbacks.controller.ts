import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post(':doctorId')
  create(@Param('doctorId') doctorId: string, @Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get(':doctorId')
  findAll(@Param('doctorId') doctorId: string) {
    return 'this.feedbacksService.findAll()';
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
