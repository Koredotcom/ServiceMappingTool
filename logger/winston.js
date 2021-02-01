import winston from 'winston';

const { createLogger, format } = winston;
const { combine, simple, colorize } = format;

// eslint-disable-next-line import/prefer-default-export
export const logger = createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        simple(),
      ),
    }),
  ],
});
