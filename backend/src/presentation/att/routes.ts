import { Router } from "express";
// Components
import { AttController } from './controller';
import { AttService } from "../services/att.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AttRoutes {
    constructor() {}

    static get routes() {
        const route = Router();
        const attService = new AttService();
        const attController = new AttController( attService );

        route.get( '/', attController.getAtt );
        route.get( '/:id', attController.getAttById );
        route.post( '/', attController.createAtt );
        route.delete('/', attController.deleteAtt );
        route.put( '/:id', attController.updateAtt );
        // [ AuthMiddleware.validateJWT ]
        return route;
    }

}
