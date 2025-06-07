import { NestFactory } from '@nestjs/core';
import { INestMicroservice, Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import enviroment from './config/configuration';

async function createMicroservice() {
  return NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: enviroment().MICROSERVICE_PORT,
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
  const logger = new Logger('MainInstance');
  const app = await createMicroservice();

  configureGlobalPipes(app);

  await app.listen();
  logger.log(
    `${enviroment().MICROSERVICE_NAME} running on port ${enviroment().MICROSERVICE_PORT}`,
  );
})();
