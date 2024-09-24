import { Request, Response } from "express";
// Components
import { CustomError } from "../../domain/error/custom.error";
import { CreateStaffDto } from "../../domain/dtos/staff/create-staff.dto";
import { StaffService } from '../services/staff.service';

export class StaffController {
  constructor(public readonly staffService: StaffService) {}


  public handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }

  getStaff = (req: Request, res: Response) => {
    // const [error, createStaffDto] = CreateStaffDto.create(req.body);
    // if (error) return res.status(400).json({ error });

    this.staffService.getStaff()
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  getStaffById(req: Request, res: Response) {

  }

  createStaff = (req: Request, res: Response) => {
    console.log(req.body);

    const [error, createStaffDto] = CreateStaffDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.staffService.createStaff(createStaffDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res));
  }


  // deleteStaff(req: Request, res: Response) {
  //   const [error, StaffDto] = CreateStaffDto.create(req.body);
  //   if (error) return res.status(400).json({ error })

  //   this.staffService.deleteStaff(StaffDto!)
  //     .then((user) => res.json(user))
  //     .catch(error => this.handleError(error, res));
  // }

  updateStaff(req: Request, res: Response) {

  }
}