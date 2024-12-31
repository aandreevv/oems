import { Module } from '@nestjs/common';
import { UploadsModule } from './components/uploads-module/uploads.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
