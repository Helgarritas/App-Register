import express, { Router } from "express";
import cors from 'cors';

interface Option {
    port: number;
    routes: Router
}

export class Server {
    public readonly app = express();
    public readonly port: number
    public readonly routes: Router

    constructor( option: Option ){
        const { port, routes } = option;
        this.port = port;
        this.routes = routes;
    }

    start() {
        // Midleawers
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(this.routes);  // Verifica esta línea

        // Listen server
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }
}