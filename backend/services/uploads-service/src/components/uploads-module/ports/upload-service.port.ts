import { UploadTypeEnum } from '../application/data/enums/upload-type.enum';
import { FileInterface } from '../application/data/interfaces/file.interface';

export abstract class UploadServicePort {
  abstract upload(file: FileInterface, type: UploadTypeEnum): Promise<string>;
  abstract remove(path: string): Promise<string>;
}
