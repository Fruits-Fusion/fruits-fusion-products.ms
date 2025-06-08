import 'dotenv/config';
import * as Joi from 'joi';

interface EnvType {
  MICROSERVICE_PORT: number;
  MICROSERVICE_NAME: string;
  MICROSERVICE_DATABASE: string;
  MICROSERVICE_SERVERS: string[];
}

export const EnvSchema = Joi.object<EnvType>({
  MICROSERVICE_PORT: Joi.number().required(),
  MICROSERVICE_NAME: Joi.string().required(),
  MICROSERVICE_DATABASE: Joi.string().required(),
  MICROSERVICE_SERVERS: Joi.array().items(Joi.string()).required(),
}).unknown(true);

const { error, value } = EnvSchema.validate({
  ...process.env,
  MICROSERVICE_SERVERS: process.env.MICROSERVICE_SERVERS?.split(','),
});

if (error) throw new Error(error.message);

export default () => ({
  ...(value as EnvType),
});
