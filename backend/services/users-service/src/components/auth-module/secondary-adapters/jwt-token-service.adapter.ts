import { TokenType } from '../application/data/enums/token-type.enum';
import { ITokenPayload } from '../application/data/interfaces/token-payload.interface';
import { TokenServicePort } from '../ports/token-service.port';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtTokenServiceAdapter implements TokenServicePort {
  private readonly jwtAccessSecret: string;
  private readonly jwtAccessExpiration: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshExpiration: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtAccessSecret = configService.get<string>('jwt.accessSecret');
    this.jwtAccessExpiration = configService.get<string>('jwt.accessExpiration');
    this.jwtRefreshSecret = configService.get<string>('jwt.refreshSecret');
    this.jwtRefreshExpiration = configService.get<string>('jwt.refreshExpiration');
  }

  public sign(payload: ITokenPayload, type: TokenType): string {
    return this.jwtService.sign(payload, {
      secret: type === TokenType.ACCESS ? this.jwtAccessSecret : this.jwtRefreshSecret,
      expiresIn: type === TokenType.ACCESS ? this.jwtAccessExpiration : this.jwtRefreshExpiration,
    });
  }
  public verify(token: string, type: TokenType): ITokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: type === TokenType.ACCESS ? this.jwtAccessSecret : this.jwtRefreshSecret,
      });
    } catch (error) {
      throw new RpcException(new UnauthorizedException(error.message));
    }
  }
}
