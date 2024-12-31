export interface IConfiguration {
  port: number;
  environment: string;
}

export const config: IConfiguration = {
  port: parseInt(process.env.PORT, 10),
  environment: process.env.ENVIRONMENT,
};

export const configuration = (): IConfiguration => config;
