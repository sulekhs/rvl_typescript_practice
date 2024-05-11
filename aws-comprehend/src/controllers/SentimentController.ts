import { AWSError } from "aws-sdk";
import { DetectSentimentResponse } from "aws-sdk/clients/comprehend";
import { PromiseResult } from "aws-sdk/lib/request";
import { Request, Response, NextFunction } from "express";
import { Sentiments, SentimentService } from "../services/SentimentService";
import { request } from "../types/Request";
import logger from "../utils/logger";

export interface SentimentData {
    sentimentData: {
        sentiment: any;
        maxSentimentScore: any;
    } | undefined
}    

export class SentimentController {
    public detectSent: SentimentService;
    //constructor(private readonly detectSent: SentimentService) {}
    constructor() {
        this.detectSent = new SentimentService();
    };

    //DETECT LANGUAGECODE
    public transcribedText = "This is awesome";
    detectLanguageCode:any = async (req: request, res:Response, next: NextFunction, transcribedText:string) => {
        var languageParams = {
            Text: transcribedText,
        }
        try {
            const detectLanguage = await this.detectSent.detectLanguage(languageParams);
            console.log("dominant languageCode : " + JSON.stringify(detectLanguage));
            res.status(200).json(detectLanguage); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
        }
    }
    
    //DETECT SENTIMENT
    detectSentiment:any = async (req: request, res: Response, next: NextFunction, language = undefined) => {

        let languageParams = {
            Text: req.body.text
        }

        let code;

        if(language === undefined) {
            const detectLanguage = await this.detectSent.detectLanguage(languageParams);
            console.log("dominant languageCode : " + JSON.stringify(detectLanguage[0]));
            code = detectLanguage[0];
        }
        else {
            code = language;
        }

        var params:Sentiments = {
            LanguageCode: code,
            Text: req.body.text,
        }
        try {//:PromiseResult<DetectSentimentResponse, AWSError> | undefined
            const sentimentData = await this.detectSent.sentimentDetector(params);
            //console.log("sentimentData of Controller : " + JSON.stringify(sentimentData));
            //return sentimentData;
            res.status(200).json(sentimentData); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }
}