import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UploadServicePort } from '../ports/upload-service.port';
import { UploadTypeEnum } from '../application/data/enums/upload-type.enum';
import admin, { storage } from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { FileInterface } from '../application/data/interfaces/file.interface';
import { RpcException } from '@nestjs/microservices';
import { initFirebase } from '../../../app.initializer';

@Injectable()
export class FirebaseUploadServiceAdapter implements UploadServicePort {
  private readonly storage: storage.Storage;
  private readonly logger: Logger;

  constructor() {
    initFirebase();
    this.storage = admin.storage();
    this.logger = new Logger(FirebaseUploadServiceAdapter.name);
  }

  async upload(file: FileInterface, type: UploadTypeEnum): Promise<string> {
    try {
      const bucket = this.storage.bucket();
      const upload = bucket.file(`${type}/${uuid()}`);

      await upload.save(Buffer.from(file.buffer), {
        metadata: { contentType: file.mimetype },
        public: true,
      });

      return upload.name;
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(new BadRequestException(error));
    }
  }

  async remove(path: string): Promise<string> {
    try {
      const bucket = this.storage.bucket();
      await bucket.file(path).delete();
      return path;
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(new BadRequestException(error));
    }
  }
}
