import { Global, Module } from '@nestjs/common';

import { AwsS3Service } from './services/awsS3.service';

@Global()
@Module({
  imports: [],
  exports: [AwsS3Service],
  providers: [AwsS3Service],
})
export class SharedModule {}
