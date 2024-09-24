import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem } from '../../../../../components/ui/select';
import { statusStyle } from '../../../../../config/status';
import { MoreHorizontalIcon } from 'lucide-react';
import { Color, DataStaff } from '../../Custom/types';
import { handleSelectChange } from './handleSelectChange';

interface SelectDemoProps {
  colors: Color;
  index: number;
  setColors: React.Dispatch<React.SetStateAction<{ [key: number]: Color }>>;
  data: DataStaff[],
  setData: React.Dispatch<React.SetStateAction<DataStaff[]>>;
}

export function SelectStatus({ colors, index, setColors, data,  setData }: SelectDemoProps) {
  const selectedValue = colors.green ? "green" : colors.amber ? "amber" : colors.red ? "red" : "blue";
  
  const { handSelectChange } = handleSelectChange(
    index,
    setColors,
    data,
    setData,
  )

  const newBg: Record<string, string> = {
    green: 'before:bg-green-a11',
    amber: 'before:bg-amber-a11',
    red: 'before:bg-red-a11',
    blue: 'before:bg-blue-a11',
  };

  const selectItems = Object.keys(statusStyle).map(key => ({
    value: key,
    select: statusStyle[key].text,
    classes: [...statusStyle[key].classes.split(' '), newBg[key]]
  }));

  return (
    <Select onValueChange={(value) => handSelectChange(value)} value={selectedValue}>
      <SelectTrigger className="w-[70px] ">
        <MoreHorizontalIcon className="h-4 w-4 opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectItems.map(({ value, select, classes }) => (
            <SelectItem key={value} value={value}>
              <div className="w-20 flex justify-between items-center">
                <p className="capitalize">{select}</p>
                <div className={`${classes.join(' ')} w-2 h-2 rounded-full relative before:content-[''] before:w-1 before:h-1 before:absolute before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full`}></div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
