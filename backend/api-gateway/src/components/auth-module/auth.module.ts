import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './primary-adapters/auth.controller';
import { AuthGuard } from './application/data/guards/auth.guard';
import { SharedModule } from '../../shared-module/shared-module';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => SharedModule)],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
