import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { AttRoutes } from "./att/routes";
import { StaffRoutes } from "./staff/routes";

export class AppRoutes {
    static get routes() {
        const route = Router();
        route.use('/api/auth', AuthRoutes.routes);
        route.use('/api/staff', StaffRoutes.routes);
        route.use('/api/att', AttRoutes.routes);
        return route;
    }
}