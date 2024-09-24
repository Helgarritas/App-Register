import {Select,  SelectContent,  SelectGroup,  SelectItem,  SelectTrigger,  SelectValue} from "../../../../components/ui/select"
import { ChevronDown } from "lucide-react"
export default function SelectStatus({ selects, setData }: any) {
 
  const handleselectsValue = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [selects.label]: value  // Usamos la etiqueta (departament o status) para actualizar el campo correspondiente
    }));
    value.charAt(0).toUpperCase() + value.slice(1);
  };



  return (
    <>
      <Select onValueChange={handleselectsValue}>
        <SelectTrigger className="w-36 px-3 py-2 flex justify-between border rounded-md">
        <SelectValue placeholder={"Select"}/>
        <ChevronDown className="h-[20px] w-[20px] opacity-70"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selects.select.map((string: string, i: number) => (
              <SelectItem key={i} value={string} className="capitalize">{string}</SelectItem>// No comp
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
