import { ITokenPayload } from '../application/data/interfaces/token-payload.interface';
import { TokenType } from '../application/data/enums/token-type.enum';

export abstract class TokenServicePort {
  abstract sign(payload: ITokenPayload, type: TokenType): string;

  abstract verify(token: string, type: TokenType): ITokenPayload;
}
