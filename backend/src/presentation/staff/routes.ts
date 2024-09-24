import { Router } from "express";
import { StaffController } from "./controller";
import { StaffService } from '../services/staff.service';

export class StaffRoutes {
    static get routes() {
        const route = Router();
        const staffService = new StaffService();
        const staffController = new StaffController(staffService);

        route.get('/', staffController.getStaff);
        route.get('/:id', staffController.getStaffById);
        route.post('/', staffController.createStaff);
        // route.delete('/:id', staffController.deleteStaff);
        route.put('/:id', staffController.updateStaff);

        return route;
    }
}