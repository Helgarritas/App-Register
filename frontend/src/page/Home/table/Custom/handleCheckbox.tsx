import { useState, useEffect, useContext } from "react";
// import { IDAtt } from "../TableDate";

import { Color, DataStaff } from "./types";
import { handleDate } from "./handleDate";
import { handleAmber } from "./handleAmber";
import { handlePeruvianTime } from "./handlePeruvianTime";
import convertToDate from "./convertToDate";
import { httpService } from "../../../../service/api/http.service";
import { SelectedDateContext } from "../../Home";

type HandleCheckBox = (index: number, checked: boolean) => void;

export const handCheckBox = (
  setData: React.Dispatch<React.SetStateAction<DataStaff[]>>,
  setColors: React.Dispatch<React.SetStateAction<{ [key: number]: Color }>>,
): { handleCheckBox: HandleCheckBox } => {
  
  const { date } = useContext(SelectedDateContext);
  const { isAmber } = handleAmber();
  const { getPeruvianTime } = handlePeruvianTime();

  const handleCheckBox = async (index: number, checked: boolean) => {

    async function http(body: {[key: string]: any}[], dateAtt: Date) {
      try {
        if (checked && body.length > 0) {
          console.log(body);
          const response: { id: string }[] = await httpService('/att', 'POST', body);
        } else if (!checked) {
          let offset = date.getTimezoneOffset() * 60000;
          let newDate = new Date(date.getTime() - offset).toISOString()

          const filters = body.map((obj) => {
            const { _id } = obj;
            return {
              id: _id,
              date: newDate
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

    setData((prevData) => {
      const updatedData = [...prevData];

      const now = new Date().toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Lima' });
      const sixPM = getPeruvianTime(true);
      const isLate = isAmber(now);

      const newColors = {
        green: checked && !isLate,
        amber: checked && isLate,
        red: !checked,
        blue: !checked,
        absent: !checked,
      };

      const { dateBack } = handleDate();
      
      setColors(prevColors => ({
        ...prevColors,
        [index]: newColors,
      }));

      updatedData[index] = {
        ...updatedData[index],
        arrivalTime: checked ? now : "",
        departureTime: checked ? sixPM : "",
        date: checked ? dateBack : "",
        status: checked ? (isLate ? 'late' : 'present') : 'absent',
      };

      const checkIndex = updatedData[index];

      let body: {[key: string]: any}[] = [{
        _id: updatedData[index]._id,
        arrivalTime: convertToDate(checkIndex.date, checkIndex.arrivalTime),// Date
        departureTime: convertToDate(checkIndex.date, checkIndex.departureTime),// Date
        status: checkIndex.status,
        comment: 'todo bien'
      }]

      http(body, new Date(date))

      return updatedData;
    });

  };

  useEffect(() => {
    // console.log(date);

  }, [date]);

  return { handleCheckBox };
};
