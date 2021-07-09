import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['auth'],
        protoPath: [join(__dirname, 'app/auth/auth.proto')],
        url: 'localhost:3005',
      },
    },
  );

  await app.listen();
}
bootstrap();
