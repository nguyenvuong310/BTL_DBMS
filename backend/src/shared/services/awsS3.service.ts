import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
@Injectable()
export class AwsS3Service {
  private s3: AWS.S3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
    });
  }
  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: String(file.originalname),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.get<string>('AWS_REGION'),
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
