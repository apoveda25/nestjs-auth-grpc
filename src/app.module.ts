import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { ArangodbModule } from './arangodb/arangodb.module';
import appConfig from './config/app.config';
import { arangodbConfig } from './config/arangodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [appConfig],
    }),
    ArangodbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    AuthModule,
  ],
})
export class AppModule {}
