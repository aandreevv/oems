export interface IConfiguration {
  port: number;
  environment: string;
  azureCommunicationConnectionString: string;
  azureCommunicationEndpoint: string;
}

export const config: IConfiguration = {
  port: parseInt(process.env.PORT, 10),
  environment: process.env.ENVIRONMENT,
  azureCommunicationConnectionString:
    process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
  azureCommunicationEndpoint: process.env.AZURE_COMMUNICATION_ENDPOINT,
};

export const configuration = (): IConfiguration => config;
