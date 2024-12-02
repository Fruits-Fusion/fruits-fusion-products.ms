import { NestFactory } from '@nestjs/core';
import { INestMicroservice, Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import enviroment from './config/configuration';

async function createMicroservice() {
  return NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: enviroment().MICROSERVICE_SERVERS,
    },
  });
}

function configureGlobalPipes(app: INestMicroservice) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

(async function main() {
  const logger = new Logger('ProductMS');
  const app = await createMicroservice();

  configureGlobalPipes(app);

  await app.listen();
  logger.log(
    `${enviroment().MICROSERVICE_NAME} running on port ${enviroment().MICROSERVICE_PORT}`,
  );
})();
