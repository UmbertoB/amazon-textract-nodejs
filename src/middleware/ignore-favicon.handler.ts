import { Request, Response, NextFunction } from 'express';

/**
 * Ignore favicon middleware
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export default function ignoreFavicon(req: Request, res: Response, next: NextFunction): void {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}