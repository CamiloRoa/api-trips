import { registerAs } from '@nestjs/config';
import * as PACKAGE_JSON from '../../package.json';

export default registerAs('config', () => {
  return {
    project: {
      name: PACKAGE_JSON.name,
      version: PACKAGE_JSON.version,
      description: PACKAGE_JSON.description,
    },
    env: {
      apiKey: process.env.API_KEY,
      databaseName: process.env.DATABASE_NAME,
    },
    swagger: {
      path: process.env.SWAGGER_PATH,
      enabled: process.env.SWAGGER_ENABLED.toLowerCase() === 'true',
    },
    server: {
      // isProd: process.env.NODE_ENV === 'production',
      // port: parseInt(process.env.PORT, 10) || 8080,
      // context: process.env.CONTEXT,
      origins: process.env.ORIGINS.split(','),
      allowedHeaders: process.env.ALLOWED_HEADERS,
      allowedMethods: process.env.ALLOWED_METHODS,
      corsEnabled: process.env.CORS_ENABLED.toLowerCase() === 'true',
      corsCredentials: process.env.CORS_CREDENTIALS.toLowerCase() === 'true',
      //logLevel: process.env.LOG_LEVEL || 'info',
    },
    mongo: {
      connection: process.env.MONGODB_CONNECTION,
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      dbName: process.env.MONGODB_NAME,
    },
    fares: {
      fareKM: process.env.COP_PER_KM,
      fareTime: process.env.COP_PER_MINUTE,
      fareBase: process.env.BASE_FARE,
    },
    payment: {
      urlPayment: process.env.URL_PAYMENT,
      currency: process.env.CURRENCY,
      keyPrivate: process.env.KEY_PRIVATE,
    },
  };
});
