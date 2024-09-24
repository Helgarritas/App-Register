import { useContext } from 'react';
import { DataStaff, Color } from "../../Custom/types";
import { handlePeruvianTime } from "../../Custom/handlePeruvianTime";
import { handleDate } from "../../Custom";
import convertToDate from "../../Custom/convertToDate";
import { httpService } from "../../../../../service/api/http.service";
import { SelectedDateContext } from '../../../Home';

export function handleSelectChange(
  index: number,
  setColors: React.Dispatch<React.SetStateAction<{ [key: number]: Color }>>,
  data: DataStaff[],
  setData: React.Dispatch<React.SetStateAction<DataStaff[]>>,
) {

  const { date, setDate } = useContext(SelectedDateContext); 

  //******* Function
  function handSelectChange(value: string) {
    
    const checked = value === "green" || value === "amber" ? true : false;

    async function http(body: {[key: string]: any}[], dateAtt: Date) {
      try {
        if (checked && body.length > 0) {
          console.log(body);
          const response: { id: string }[] = await httpService('/att', 'POST', body);
        } else if (!checked) {
          const filters = body.map((obj) => {
            const { _id} = obj;

            // const offset = dateAtt.getTimezoneOffset() * 60000; 
            // const localISODate = new Date(date.getTime() - offset).toISOString().slice(0, -1);
            return {
              id: _id,
              date: dateAtt.toISOString()
            };
          });
          console.log({
            filters: filters
          });
          await httpService(`/att`, 'DELETE', filters);
        }
      } catch (error) {
        console.error('Error creating or deleting att:', error);
      }
    }

    const { getPeruvianTime } = handlePeruvianTime();
    const now = new Date().toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Lima' });
    const sixPM = getPeruvianTime(true);
    
    const newColors = {
      green: value === "green",
      amber: value === "amber",
      red: value === "red",
      blue: value === "blue",
      absent: false,
    };
  
    const { dateBack } = handleDate();
  
    setColors(prevColors => ({
      ...prevColors,
      [index]: newColors,
    }));
  
    const updatedData = data.map((attObj, i) => {
      if (index === i) {
        return {
          ...attObj,
          date: value === "green" || value === "amber" ? dateBack : "",
          arrivalTime: value === "green" || value === "amber" ? now : "",
          departureTime: value === "green" || value === "amber" ? sixPM : "",
          status: 'present',
          commnet: ''
        };
      }
      return attObj;
    });
  
    setData(updatedData);

    const body = updatedData.filter((attObj, i) => index === i).map(attObj => ({
      ...attObj,
      arrivalTime: convertToDate(attObj.date, attObj.arrivalTime),
      departureTime: convertToDate(attObj.date, attObj.departureTime),
      status: attObj.status,
      comment: 'todo bien'
    }));
  
    http(body, new Date(date))
  }

  return{ handSelectChange } 
}
