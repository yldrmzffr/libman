import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigManagerService } from './config-manager.service';

@Global()
@Module({})
export class ConfigManagerModule {
  static forRoot(envConfig: Record<string, any>): DynamicModule {
    return {
      module: ConfigManagerModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
          validationOptions: {
            allowUnknown: true,
          },
          load: [() => envConfig],
          cache: true,
        }),
      ],
      providers: [ConfigManagerService],
      exports: [ConfigManagerService],
    };
  }
}
