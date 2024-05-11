import AWS from 'aws-sdk';
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';
import dotenv from 'dotenv';
dotenv.config();

export type Sentiments = {
    Sentiment?: string;
    SentimentScore?: number;
    LanguageCode: string;
    Text: string;
    percent?: number;
}

export class SentimentService {
    public sentimentService: AWS.Comprehend;
    public serviceConfigOptions : ServiceConfigurationOptions = {
        region: (process.env.AWS_REGION) as unknown as string,
        accessKeyId: (process.env.AWS_ACCESS_KEY_ID) as unknown as string,
        secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY) as unknown as string
    };
    // public sentimentService = new AWS.Comprehend({
    //     region: process.env.AWS_REGION,
    //     credentials: {
    //         accessKeyId: (process.env.AWS_ACCESS_KEY_ID) as unknown as string,
    //         secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY) as unknown as string
    //     }
    // });
    //public sentCtrl: SentimentController;

    // constructor() {
    //     this.sentimentService = this.sentimentService;
    // };
    constructor(){
        this.sentimentService = new AWS.Comprehend(this.serviceConfigOptions);
        // this.sentimentService = new AWS.Comprehend({
        //     region: process.env.AWS_REGION,
        //     credentials: {
        //         accessKeyId: (process.env.AWS_ACCESS_KEY_ID) as unknown as string,
        //         secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY) as unknown as string
        //     }
        // })
    }

    async sentimentDetector (params:Sentiments) : Promise<{ sentiment: any; percent: any; } | undefined> {// : Promise<PromiseResult<AWS.Comprehend.DetectSentimentResponse, AWS.AWSError> | undefined>
        try {
            //console.log("params : " +params)
            const sentimentData = this.sentimentService.detectSentiment(params).promise();
            const sentiment:any = (await sentimentData).Sentiment;
            const sentimentScore = (await sentimentData).SentimentScore;
            console.log("This is : " + sentiment);
            console.log("This is : " + JSON.stringify(sentimentScore));
            const value = Object.values((sentimentScore) as unknown as { [s: string]: number } | ArrayLike<number>);
            const maxSentimentScore = (Math.max(...value) as unknown as unknown[]);
            console.log("Highest sentimentScore is : " + ((maxSentimentScore as unknown as number) * 100).toFixed(2));
            const percent = ((maxSentimentScore as unknown as number) * 100).toFixed(2);   
            const data = {sentiment, percent}
            console.log("data : " + JSON.stringify(data));
            return data; //((await sentimentData).Sentiment) as unknown as { $response: Response<DetectSentimentResponse, AWSError>};
        } catch (err:any) {
            console.log("error 500 : " + err);
        }
    }

    async detectLanguage (params:any) {
        try {
            console.log("params : " +JSON.stringify(params));
            const detectLanguage = this.sentimentService.detectDominantLanguage(params).promise();
            const languageCode:any = (await detectLanguage).Languages;
            //console.log("languageCode " + JSON.stringify(languageCode))
            let dominantCode = languageCode.map((x: { LanguageCode: any; }) => x.LanguageCode);
            console.log("dominantCode : " + JSON.stringify(dominantCode))
            return dominantCode;
            //const code = dominantCode;
            //let dominantCode;
            // languageCode.sort(function(a: any, b: any) {
            //     dominantCode = a.Score > b.Score ? console.log("a : " +a) : console.log("b : " + b)
            // })        
            //})
            //console.log("detectLanguage : " + JSON.stringify(detectLanguage))
            
            //console.log("LanguageCode is : " + languageCode);
                // if(detectLanguage !== null) {2
                //     console.log("Data : " + JSON.stringify(detectLanguage));
                //     const languageCode:any = (await detectLanguage).Languages;
                //     console.log("This is : " + languageCode);
                //     //return sentiment;
                // }
            //return detectLanguage; //as unknown as { $response: Response<DetectDominantLanguageResponse, AWSError>};
            //return (sentimentData) as unknown as { $response: Response<DetectSentimentResponse, AWSError>};
        } catch (err: any) {
            
        }
    }


}