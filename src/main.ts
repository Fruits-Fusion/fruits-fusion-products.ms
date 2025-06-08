import { Logger } from '@nestjs/common';
import enviroment from './config/env.config';
import {
  configureGlobalPipes,
  createMicroservice,
} from './config/server.config';

(async function main() {
  const logger = new Logger('MainInstance');
  const app = await createMicroservice();

  configureGlobalPipes(app);

  await app.listen();
  logger.log(
    `${enviroment().MICROSERVICE_NAME} running on port ${enviroment().MICROSERVICE_PORT}`,
  );
})();
