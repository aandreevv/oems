export interface IConfiguration {
  port: number;
  environment: string;
  jwt: ITokensConfiguration;
  salt: number;
}

export interface ITokensConfiguration {
  accessSecret: string;
  refreshSecret: string;
  accessExpiration: string;
  refreshExpiration: string;
}

export const config: IConfiguration = {
  port: parseInt(process.env.PORT, 10),
  environment: process.env.NODE_ENV,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  },
  salt: parseInt(process.env.SALT, 10),
};

export default (): IConfiguration => config;
