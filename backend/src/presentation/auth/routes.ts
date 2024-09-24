import { Router } from "express";
// Components
import { AuthController } from './controller';
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config/envs";

export class AuthRoutes {
    constructor() {}

    static get routes() {
        const route = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL,
        );
        const authService = new AuthService(emailService);
        const authController = new AuthController(authService);

        route.post('/login', (req, res) => authController.loginUser(req, res));
        route.post('/register', (req, res) => authController.registerUser(req, res));
        route.get('/validate-email/:token', (req, res) => authController.validatedEmail(req, res));

        return route;
    }
}
