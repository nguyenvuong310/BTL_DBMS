import { Module } from '@nestjs/common';
import { ReplysService } from './replies.service';
import { ReplysController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { ReplyRepository } from './responsibilities/reply.reposibility';
@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  controllers: [ReplysController],
  providers: [ReplysService, ReplyRepository],
  exports: [ReplysService],
})
export class ReplysModule {}
