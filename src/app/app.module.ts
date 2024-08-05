import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import {
  ConfigManagerModule,
  ConfigManagerService,
} from '../commons/config-manager';

import { config } from '../commons/config';

@Module({
  imports: [
    ConfigManagerModule.forRoot(config),
    LoggerModule.forRootAsync({
      imports: [ConfigManagerModule],
      useFactory: async (configManager) => ({
        pinoHttp: {
          level: configManager.getAsStringOrThrow('logLevel'),
        },
      }),
      inject: [ConfigManagerService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
