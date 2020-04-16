import { Application, Request, Response } from 'express';
import TextractController from '../controller/textract.controller';
import multer from 'multer';
const upload = multer();

/**
 * Receives the application object and iterates through server routes.
 *
 * @param app
 */
export default function InitializeRoutes (app: Application): void {

    app.post('/api/textract', upload.single('file'), (req: Request, res: Response) => new TextractController(req, res).executeComplete());

    app.post('/api/textract/simplified', upload.single('file'), (req: Request, res: Response) => new TextractController(req, res).executeSimplified());

}
