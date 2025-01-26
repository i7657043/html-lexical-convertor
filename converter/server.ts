import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { logger } from './src/logger';
import { convertHtmlToLexical } from './src/convertHtmlToLexical';

const app = express();
const port = 3000;

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: 'Too many requests from this IP, please try again after 1 minute',
});

app.use(limiter);
app.use(bodyParser.json());

app.post('/', (req: Request, res: Response) => {  
  var htmlString = req.body.htmlString;
  var fieldName = req.body.fieldName;

  var ip = req.headers['x-forwarded-for'];
  logger.info(`Request from IP: ${ip}`);

  var json = convertHtmlToLexical(htmlString, fieldName)

  res.json(json);
  });

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(`Server running in dev mode at http://localhost:${port}`);
  }
  else
  {
    logger.info(`Server running on port: ${port}`);
  }
});

