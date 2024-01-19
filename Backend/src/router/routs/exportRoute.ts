import * as express from 'express'
import exportController from '../../controller/exportController'


export const exportRoute = express.Router()


exportRoute.post('/export' , exportController.export)