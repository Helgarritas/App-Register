import React, { useEffect, useState } from "react";
// Components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui";
import { PlusCircleIcon, CheckCircle2, XCircleIcon } from "lucide-react";
import { httpService } from "../../../service/api/http.service";
import SelectStatus from "./components/SelectStatus";
import { useToast } from "../../../hooks/use-toast";

const inputLabel = [
  {
    label: 'name',
    input: ''
  },
  {
    label: 'email',
    input: ''
  },
  {
    label: 'cellphone',
    input: ''
  },
]

const selectLabel: {[key: string]: any} = [
  {
    label: 'departament',
    select: ['administration', 'accounting', 'logistics', 'mechanical']
  },
  {
    label: 'status',
    select: ['active', 'inactive']
  },
]

export function NewStaff() {
  const [data, setData] = useState<{[key: string]: any}>({
    name: '',
    email: '',
    img: '',
    departament: '',
    cellphone: '',
    status: ''
  });

  const { toast } = useToast();

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prevState: {[key: string]: any}) => ({
        ...prevState,
        [name]: value 
      })
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await httpService('/staff', 'POST', data);
      toast({
        description: (
          <div className="flex items-center before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-green-a3 before:-z-10">
            <CheckCircle2 className="mr-2 text-green-a11" size={20} />
            <span className="text-green-a11">Personal agregado con éxito</span>
          </div>
        ),
        duration: 2500,
      });
      
      setData({name: '',email: '',img: '',departament: '',cellphone: '',status: ''});
    } catch (error) {
      toast({
        description: (
          <div className="flex items-center before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-red-a3 before:-z-10">
            <XCircleIcon className="mr-2 text-red-a11" size={20} />
            <span className="text-red-a11">No se pudo agregar</span>
          </div>
        ),
        duration: 2500,
      });
    }
  };

  useEffect(() => {

    return () => {
      
    };
  }, [data]);

  return (
    <>  
      <Dialog>
        <DialogTrigger asChild>
          <Button className="py-0">
            <PlusCircleIcon className="mr-2 w-[15px] h-[15px]" />
            <p>Add</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Crear Perfil</DialogTitle>
              <DialogDescription>
                Agregue nuevos perfiles aquí. Haga clic en guardar cuando haya terminado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {inputLabel.map((obj, i) => (
                <div key={i} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left capitalize">
                    {obj.label}
                  </Label>
                  <Input
                    id="name"
                    name={obj.label}
                    value={data[obj.label]}
                    onChange={handleChangeInput}
                    className="col-span-3"
                  />
                </div>
              ))}
              {selectLabel.map((obj: {[key:string]: any}, i: number) => (
                <div key={i} className="grid grid-cols-4 items-center gap-4">
                  <Label className="capitalize">{obj.label}</Label>
                  <SelectStatus selects={obj} setData={setData}/>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button>Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

