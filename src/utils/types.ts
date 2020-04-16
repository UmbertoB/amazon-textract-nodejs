import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpStatusCode } from './enums';

export type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

export type Route = {
    path: string;
    method: HttpMethod;
    handler: Handler | Handler[];
};

export type PaginationOptions = {
    skip: number;
    take: number;
    order: { [property: string]: 'ASC' | 'DESC' };
};

export type jsonResponse = {
    statusCode: HttpStatusCode;
    message?: any;
    error?: any[];
    meta?: any[];
};