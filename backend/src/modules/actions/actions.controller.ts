import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';

@Controller('Actions')
export class ActionsController {
  constructor(private readonly ActionsService: ActionsService) {}

  @Post()
  createAction(@Body() createActionDto: CreateActionDto) {
    return this.ActionsService.create(createActionDto);
  }
}
