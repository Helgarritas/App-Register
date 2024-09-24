import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { FilterIcon } from "lucide-react"
  
export function SelectUser() {
  return (
    <>
      <Select>
         <SelectTrigger className="w-28 px-3 py-2 flex gap-2 border rounded-md">
           <FilterIcon className="h-[15px] w-[15px] opacity-70"/>
           <SelectValue placeholder="Filter" />
         </SelectTrigger>
         <SelectContent>
           <SelectGroup>
             <SelectItem value="mecanica">Mecánica</SelectItem>
             <SelectItem value="logistica">Logística</SelectItem>
           </SelectGroup>
         </SelectContent>
      </Select>
    </>
  )
}