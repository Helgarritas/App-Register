import { useContext, useCallback  } from "react";
import { Color, DataStaff } from "./types";
import { handleDate } from './handleDate';
import { handleAmber } from './handleAmber';
import { handlePeruvianTime } from "./handlePeruvianTime";
import convertToDate from "./convertToDate";
import { httpService } from "../../../../service/api/http.service";
import { SelectedDateContext } from "../../Home";

type HandleAllCheckBox = (checked: boolean) => void;

export const handAllCheckBox = (
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  data: DataStaff[],
  setData: React.Dispatch<React.SetStateAction<DataStaff[]>>,
  colors: { [key: number]: Color },
  setColors: React.Dispatch<React.SetStateAction<{ [key: number]: Color }>>,
  iCheckAll: number[],
  setICheckAll: React.Dispatch<React.SetStateAction<number[]>>,
): { handleAllCheckBox: HandleAllCheckBox } => {

  const { date } = useContext(SelectedDateContext);
  const { isAmber } = handleAmber();
  const { getPeruvianTime } = handlePeruvianTime();

  const handleAllCheckBox = useCallback((checked: boolean) => {

    async function http(body: {[key: string]: any}[], dateAtt: Date) {
      try {
        if (checked && body.length > 0) {
          const response: { id: string }[] = await httpService('/att', 'POST', body);
          
        } else if (!checked) {
          const filters = body.map((obj) => {
            const { _id } = obj;

            return {
              id: _id,
              date: dateAtt.toISOString()
            };
          });
          console.log({
            filters: filters
          });
          await httpService('/att', 'DELETE', filters);
        }
      } catch (error) {
        console.error('Error creating or deleting att:', error);
      }
    }
    
    setAllChecked(checked);

    const now = new Date().toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Lima' });
    const sixPM = getPeruvianTime(true);
    const isLate = isAmber(now);

    const { dateBack } = handleDate();

    const newData = data
      .filter((obj, indice) => {
        const newColors = {
          green: checked && !isLate,
          amber: checked && isLate,
          red: !checked,
          blue: !checked,
          absent: !checked,
        };

        if(!obj.arrivalTime){
          setColors(prevColors => ({
            ...prevColors,
            [indice]: newColors,
          }));
          setICheckAll((prevI) => {
            return [
              ...prevI, indice
            ]
          })
        }else{
          iCheckAll.map((number) => {// [i]
            setColors(prevColors => ({
              ...prevColors,
              [number]: newColors,
            }));
          })
        }

      return checked ? !obj.arrivalTime : iCheckAll.includes(indice);
      })
      .map((attObj) => {// Modifica los elementos filtrados
      const arrivalTime = attObj.arrivalTime || (checked ? now : "");
      const departureTime = attObj.departureTime || (checked ? sixPM : "");

      return { // for UI
        ...attObj,
        date: checked ? dateBack : '', 
        arrivalTime: checked ? arrivalTime : '',
        departureTime: checked ? departureTime : '',
        status: checked ? (isLate ? 'late' : 'present') : 'absent',
      };
    });

    setData(prevData => 
      prevData.map(attObj => {
        const updatedObj = newData.find(newAtt => newAtt._id === attObj._id);
        return updatedObj ? updatedObj : attObj; 
      })
    );

    const body = newData
      .filter(attObj => attObj.arrivalTime || attObj.departureTime)
      .map(attObj => ({
        _id: attObj._id,
        arrivalTime: convertToDate(dateBack, attObj.arrivalTime),
        departureTime: convertToDate(dateBack, attObj.departureTime),
        status: attObj.status,
        comment: 'todo bien',
      }));

    http( body, new Date(date))


  }, [data, isAmber, colors]);

  return { handleAllCheckBox };
}