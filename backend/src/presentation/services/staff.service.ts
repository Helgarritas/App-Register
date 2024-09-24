import { CreateStaffDto } from "../../domain/dtos/staff/create-staff.dto";
import { StaffModel } from "../../data/mongo/model/staff.model";
import { CustomError } from "../../domain/error/custom.error";
import { JwtAdapter } from "../../config/jwt.adapter";
import { StaffEntity } from "../../domain/entities/staff.entity";

export class StaffService {
  public async getStaff() {
    const staffname = await StaffModel.find({}, { name: 1 });// viene co ID: [{}]
    if (!staffname) throw CustomError.badRequest('Solicite names error');

    try {
      return staffname.map((obj) => {
        return {
          _id: obj._id,
          name: obj.name,
          date: '',
          arrivalTime: '',
          departureTime: '',
          status: '',
          comment: ''
        }
      })

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  
  public async createStaff(createStaffDto: CreateStaffDto) {
    const staffExists = await StaffModel.findOne({ email: createStaffDto.email });
    if (staffExists) throw CustomError.badRequest('Staff already is register');

    try {
      const staff = new StaffModel({
        ...createStaffDto,
      });

      await staff.save(); 

      return {
        staff: staff, 
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteStaff(createStaffDto: CreateStaffDto) {
    const attExists = await StaffModel.findOne({ date: createStaffDto.email });
    if (!attExists) throw CustomError.badRequest('Staff already not is register');

    try {
      const staff = new StaffModel({
        ...createStaffDto
      });

      await staff.save();

      return {
        name: staff.name,
        email: staff.email,
        departament: staff.departament,
        img: staff.img,
        cellphone: staff.cellphone,
        status: staff.status,
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}