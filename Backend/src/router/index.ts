import * as express from "express"
import { uploadeRoutes } from "./routs/uploadRoutes";
import { exportRoute } from "./routs/exportRoute";


export const routs = express.Router();

routs.use(uploadeRoutes)
routs.use(exportRoute)