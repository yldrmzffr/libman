export const config = {
  env: process.env.NODE_ENV || 'dev',
  logLevel: process.env.LOG_LEVEL || 'debug',
  mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hm',
};
