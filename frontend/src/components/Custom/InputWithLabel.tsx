import { useContext, useEffect } from "react";
import { FormContext } from '../../page/Auth/Components/form/Form';
// UI
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function InputWithLabel({ field }: {[key: string]: any}) {
  const { data, setData } = useContext(FormContext);

  // Verificar si field es válido antes de renderizar
  if (!field || !field.name) {
    console.error('El campo field no es válido:', field);
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState: {[key: string]: any}) => ({
        ...prevState,
        [name]: value 
      })
    );
  };

  useEffect(() => {
    console.log(data);
    return () => {
      
    };
  }, []);

  return (
    <div className="grid w-full min-w-[24rem] items-center gap-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Input 
        name={field.name} 
        type={field.type}
        value={data[field.name] || ''}  // Para evitar errores si el valor es undefined
        placeholder={field.placeholder || ''}  // Agregado || para evitar undefined
        onChange={handleChange}
      />
    </div>
  );
}

