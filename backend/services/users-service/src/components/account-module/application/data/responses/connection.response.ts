import { ConnectionEnum } from '../enums/connection.enum';

export class ConnectionResponse {
  id: string;
  type: ConnectionEnum;
  url: string;
}
