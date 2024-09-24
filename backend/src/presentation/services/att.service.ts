import { CreateAttDto } from "../../domain/dtos/attendance/create-att.dto";
import { AttModel } from "../../data/mongo/model/attendance.model";
import { CustomError } from "../../domain/error/custom.error";
import { dateUtils } from '../../utils/date.utils';
export class AttService {

  async createAtt(createAttDto: CreateAttDto) {
    // const attExists = await AttModel.findOne({ 
    //   arrivalTime: createAttDto.arrivalTime, 
    //   user: createAttDto._id // Cambia esto según tus necesidades
    // });
    
    // if (attExists) throw CustomError.badRequest('Attendance already registered');
    
    try {
      const { _id, ...properties } = createAttDto;
      
      createAttDto.arrivalTime = dateUtils.getLocalISODate(new Date(createAttDto.arrivalTime))
      createAttDto.departureTime = dateUtils.getLocalISODate(new Date(createAttDto.departureTime))

      const att = new AttModel({ ...properties, user: _id });
      await att.save();
            
      return { id: att.id };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  

  async deleteAtt(filter: { [key: string]: any }) {
    const { id, date } = filter;

    console.log(date);

    const startDate = new Date(date); 
    startDate.setHours(0, 0, 0, 0); // 8:00 AM del 24 de septiembre
    
    const endDate = new Date(date); 
    endDate.setHours(18, 30, 0, 0); // 6:30 PM del 24 de septiembre
    
    // Aplicar compensación de zona horaria manual si es necesario
    const offset = startDate.getTimezoneOffset(); // minutos de diferencia
    startDate.setMinutes(startDate.getMinutes() - offset);
    endDate.setMinutes(endDate.getMinutes() - offset);

    console.log(startDate);
    console.log(endDate);


    try {
      const deletedAttendances = await AttModel.deleteMany({
        arrivalTime: {
          $gte: startDate,
          $lt: endDate,
        },
        user: id
      }); 
      if (deletedAttendances.deletedCount === 0) {
        throw CustomError.internalServer('No attendances found to delete');
      }
  
      return { message: `${deletedAttendances.deletedCount} attendances deleted` };
    } catch (error) {
      console.error(error);
      throw CustomError.internalServer(`${error}`);
    }
  }


}