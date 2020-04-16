import dotenv from 'dotenv';

import errors from '../utils/i18n/pt/errors';
import messages from '../utils/i18n/pt/messages';

dotenv.config();

const { env } = process;

export default {
  name: 'PSI-BACKEND',
  version: '0.0.1',
  environment: env.NODE_ENV || 'development',
  host: env.HOST || 'localhost',
  port: env.PORT|| '3000',
  logging: {
    dir: env.LOGGING_DIR || 'logs',
    level: env.LOGGING_LEVEL || 'debug'
  },
  errors,
  messages,
};
