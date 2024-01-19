import * as express from 'express'
import uploadController from  '../../controller/uploadController' 

export const uploadeRoutes = express.Router();



uploadeRoutes.post('/upload', uploadController.uploadeCSV)