import { useState, useEffect, createContext } from "react";

import { TableDemo } from "./table/TableDate";
import { SearchUser } from "./SearchUser";
import { SelectUser } from "./SelectUser";
import { DatePicker } from "./DatePicker";
import { NewStaff } from "./newStaff/NewStaff";

interface SelectedDateContextType {
  date: Date; 
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const SelectedDateContext = createContext<SelectedDateContextType>({
  date: new Date(), // Default to undefined
  setDate: () => {}, 
});

function Home() {
  const [date, setDate] = useState<Date>(new Date()); // Initialize state

  useEffect(() => {
    // console.log(date);
    return () => {
      
    };
  }, [date]);

  return (
    <SelectedDateContext.Provider value={{ date, setDate }}>
      <div className="px-24 pt-10 w-full grid gap-4">
        <div className="w-full flex justify-between">
          <div className="flex gap-4">
            <SearchUser />
            <DatePicker />
          </div>
          <div className="flex gap-2"> 
            <SelectUser />
            <NewStaff />
          </div>
        </div>
        <TableDemo />
      </div>
    </SelectedDateContext.Provider>
  );
}

export default Home;
