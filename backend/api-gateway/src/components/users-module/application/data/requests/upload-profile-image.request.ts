import { ApiProperty } from '@nestjs/swagger';

export class UploadProfileImageRequest {
  @ApiProperty({ format: 'binary', type: 'string' })
  image: string;
}
