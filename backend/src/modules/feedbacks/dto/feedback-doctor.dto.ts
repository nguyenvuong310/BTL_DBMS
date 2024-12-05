import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { InfoFeedbackDto } from './info-feedback.dto';

export class FeedbackDoctorsDto {
  meta: {
    totalComments: number;
    avgRating: number;
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
  };

  items: InfoFeedbackDto[];
  constructor(meta: any, items: InfoFeedbackDto[], doctor: Doctor) {
    this.meta = {
      totalComments: items.length || 0,
      avgRating: doctor.rating || 0,
      oneStar: meta.star1 || 0,
      twoStar: meta.star2 || 0,
      threeStar: meta.star3 || 0,
      fourStar: meta.star4 || 0,
      fiveStar: meta.star5 || 0,
    };
    this.items = items || [];
  }
}
