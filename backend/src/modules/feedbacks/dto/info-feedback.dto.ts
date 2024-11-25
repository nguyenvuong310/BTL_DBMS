import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from '../entities/feedback.entity';

export class InfoFeedbackDto {
  @ApiProperty({
    example: 'a02dd4ad-a083-4591-b09d-08ae34b6e298',
  })
  id: string;
  @ApiProperty({ example: 1 })
  rating: number;

  @ApiProperty({ example: 'good' })
  comment: string;

  @ApiProperty({ example: '006b7cce-361d-41b3-9840-5a453c40db20' })
  doctor_id: string;

  @ApiProperty({ example: 'acfa91cf-a332-11ef-a2a3-0242ac140003' })
  feedbacker: string;

  constructor(feedback: Feedback) {
    this.id = feedback?.id;
    this.rating = feedback?.rating;
    this.comment = feedback?.comment;
    this.doctor_id = feedback?.doctor?.id;
    this.feedbacker = feedback?.patient?.id;
  }
}
