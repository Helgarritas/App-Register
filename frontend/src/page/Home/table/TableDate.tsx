import { useState, useEffect, createContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Checkbox } from "../../../components/ui";
import { StatusTag, SelectStatus } from "./Components";
import { handCheckBox, handAllCheckBox } from "./Custom";
import { httpService } from "../../../service/api/http.service";
import { Color, DataStaff } from "./Custom/types";

interface IDAttContextType {
  id: string[];
  setId: React.Dispatch<React.SetStateAction<string[]>>;
}

export const IDAtt = createContext<IDAttContextType>({
  id: [],
  setId: () => {}, 
});

export const TableDemo = () => {
  const [data, setData] = useState<DataStaff[]>([]);//
  const [colors, setColors] = useState<{ [key: number]: Color }>({});
  const [allChecked, setAllChecked] = useState(false);
  const [iCheckAll, setICheckAll] = useState<number[]>([]);

  const { handleCheckBox } = handCheckBox(
    setData,
    setColors,
  );

  const { handleAllCheckBox } = handAllCheckBox(
    setAllChecked,
    data,
    setData,
    colors,
    setColors,
    iCheckAll,
    setICheckAll
  );

  async function getData() {
    const res = await httpService('/staff', 'GET', null); // Cambia '' a null
    setData(res)
  }

  useEffect(() => {
    const initialColors = data.reduce((acc, _, index) => {
      acc[index] = { green: false, amber: false, red: true, blue: false, absent: true };
      return acc;
    }, {} as { [key: number]: any });
  
    setColors(initialColors);
    getData();
  }, []); 

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[70px]">
            <Checkbox
              checked={allChecked}
              onCheckedChange={checked => handleAllCheckBox(checked as boolean)}
            /> 
          </TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="w-[250px]">Fecha</TableHead>
          <TableHead className="text-center w-[160px]">Entrada</TableHead>
          <TableHead className="text-center w-[160px]">Salida</TableHead>
          <TableHead className="text-center w-[150px]">Estado</TableHead>
          <TableHead className="text-center w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((dataObj, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">
              <Checkbox
                checked={colors[index]?.green || colors[index]?.amber}
                onCheckedChange={(checked) => { handleCheckBox(index, checked as boolean)}}
              />
            </TableCell>
            <TableCell className="font-medium">IV00NA</TableCell>
            <TableCell>{dataObj.name}</TableCell>
            <TableCell>{dataObj.date}</TableCell>
            <TableCell className="text-center">{dataObj.arrivalTime}</TableCell>
            <TableCell className="text-center">{dataObj.departureTime}</TableCell>
            <TableCell className="text-center">
              <StatusTag color={colors[index] || { green: false, amber: false, red: true, blue: false }} />
            </TableCell>
            <TableCell className="pl-0 w-[70px] grid place-items-center">
              <SelectStatus
                setColors={setColors}
                index={index}
                colors={colors[index] || { green: false, amber: false, red: true, blue: false }}
                data={data}
                setData={setData} // Asegúrate de pasar setData aquí
              />            
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* Puedes agregar celdas de pie de tabla aquí */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
