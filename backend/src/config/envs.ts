import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  // mongo
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),

  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
  
  USER_MODEL: get('USER_MODEL').required().asString(),
  ADMIN_MODEL: get('ADMIN_MODEL').required().asString()
}