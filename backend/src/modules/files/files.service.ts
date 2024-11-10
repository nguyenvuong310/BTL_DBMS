import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsS3Service } from 'src/shared/services/awsS3.service';

@Injectable()
export class FilesService {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      return this.awsS3Service.uploadFile(file);
    } catch (error) {
      console.log(error);
    }
  }
}
