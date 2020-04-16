import { Request, Response } from "express";
import AWS from 'aws-sdk';
import fs from "fs";
import Textract, { DetectDocumentTextResponse } from "aws-sdk/clients/textract";

export default class TextractController {

    private AWSTextract: Textract;
    private req: Request;
    private res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
        this.AWSTextract = new AWS.Textract({ region: '', accessKeyId: '', secretAccessKey: '' });
    }

    public async executeSimplified() {

        let documentText: DetectDocumentTextResponse = await new Promise((resolve) => {
            this.AWSTextract.detectDocumentText({ Document: { Bytes: this.req.file.buffer } }, (err, data) => {
                if (err) this.res.send(err);
                resolve(data)
            })
        });

        let Texts: string[] = [];
        if (documentText && documentText.Blocks) {
            Texts = documentText.Blocks.map(block => block.Text ? block.Text : '');
        }

        this.res.send(Texts);

    }

    public async executeComplete() {

        let documentText: DetectDocumentTextResponse = await new Promise((resolve) => {
            this.AWSTextract.detectDocumentText({ Document: { Bytes: this.req.file.buffer } }, (err, data) => {
                if (err) this.res.send(err);
                resolve(data)
            })
        });

        this.res.send(documentText);

    }

};
