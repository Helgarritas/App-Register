import { Request, Response } from "express";
// Components
import { CustomError } from "../../domain/error/custom.error";
import { AttService } from "../services/att.service";
// Dto
import { CreateAttDto } from "../../domain/dtos/attendance/create-att.dto";

export class AttController {
  constructor(
    public readonly attService: AttService
  ) { }

  public handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }

  getAtt = (req: Request, res: Response) => {

  }

  getAttById = (req: Request, res: Response) => {
    
  }

  createAtt = (req: Request, res: Response) => {
    const body = req.body; 
    console.log(body);
    const promises = body.map((att: any) => {
      const [error, attDto] = CreateAttDto.create(att);
      if (error) return res.status(400).json({ error })
      
      return this.attService.createAtt(attDto!)
    });

    Promise.all(promises)// [{}]
      .then((user) => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  deleteAtt = (req: Request, res: Response) => {
    const body = req.body; // [{id, date}]
    // console.log(body)
    if (!Array.isArray(body) || body.length === 0) {
      return res.status(400).json({ error: 'Invalid body for delete ATT' });
    }
  
    const promises = body.map( filter => {//{id , date}
      return this.attService.deleteAtt(filter);
    });
  
    Promise.all(promises)
      .then((user) => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  updateAtt = (req: Request, res: Response) => {

  }
}