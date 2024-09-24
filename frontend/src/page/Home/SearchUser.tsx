import React, { useEffect, useState } from "react";
// Components
import { Input } from "../../components/ui/input";

export function SearchUser() {
  const [value, setValue] = useState('');

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setValue(values);
  }
//   useEffect(() => {

//   }, [value]);

  return (
    <>
      <Input 
        onChange={handleValue}
        placeholder="Filter users..." 
        className="w-80"
      />
    </>
  )
}