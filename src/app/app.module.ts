import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import {
  ConfigManagerModule,
  ConfigManagerService,
} from '../commons/config-manager';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from '../commons/config';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';

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
    MongooseModule.forRootAsync({
      imports: [ConfigManagerModule],
      useFactory: async (configManager) => ({
        uri: configManager.getAsStringOrThrow('mongoDbUri'),
      }),
      inject: [ConfigManagerService],
    }),
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
