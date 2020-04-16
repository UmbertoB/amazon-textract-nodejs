import { Request, Response } from 'express';
import { Logger } from '../lib/logger';

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @returns void
 */
export default function genericErrorHandler(err: any, req: Request, res: Response): void {
  const logger = new Logger(__filename);
  logger.error(`Error: ${err}`);

  const errCode = err.status || err.code || 500;
  let errorMsg = '';

  if (err) {
    errorMsg = err ? err.message  : '';
  }

  if (err.errorsArray) {
    errorMsg = err.errorsArray.map((e: any) => e.param + ': ' + e.msg).toString();
  }

  res.status(errCode).json({
    statusCode: errCode,
    message: errorMsg
  });
}
