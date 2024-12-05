import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from '../entities/feedback.entity';
import { InfoDoctorDto } from 'src/modules/doctors/dto/info-doctor.dto';

export class InfoFeedbackDto {
  @ApiProperty({
    example: 'a02dd4ad-a083-4591-b09d-08ae34b6e298',
  })
  id: string;
  @ApiProperty({ example: 1 })
  rating: number;

  @ApiProperty({ example: 'good' })
  comment: string;

  @ApiProperty({ example: '20/10/2024' })
  createdAt: string;

  feedbacker: {
    id: string;
    name: string;
    avatar: string;
  };

  constructor(feedback: Feedback) {
    this.id = feedback?.id;
    this.rating = feedback?.rating;
    this.comment = feedback?.comment;
    this.feedbacker = {
      id: feedback?.patient?.id,
      name: feedback?.patient?.name,
      avatar: feedback?.patient?.avatar,
    };
    const date = new Date(feedback?.createdAt);
    this.createdAt = date.toLocaleDateString('en-GB');
  }
}
