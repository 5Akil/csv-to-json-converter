import { AppDataSource } from "./data-source"
import * as cors from "cors"
import * as express from 'express'
import * as bodyParser from 'body-parser';
import { routs } from "./router";
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json())

AppDataSource.initialize().then(async () => {

    app.use('/',routs)
    
    app.listen(1234, () => {
        console.log(`Server is running on port 1234`);
    });

}).catch(error => console.log(error))
