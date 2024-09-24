import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/logo-contmin.png';
// Components
import { AuthService } from "../../../../service/Auth/auth.service";
import LogInBody from "./LogInBody";
import RegisterBody from "./RegisterBody";

// Crear el contexto fuera del componente
export const FormContext = createContext<any>(undefined);

interface Asistance {
  title: string;
}

interface FormData {
  email: string;
  password: string;
}

function Form() {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [handleSwitch, setHandleSwitch] = useState<number>(0);

  function handleLog(i: number) {
    setHandleSwitch(i);
  }

  //* Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const authService = new AuthService(navigate);
      const dataUser = await authService[`${handleSwitch === 0 ? 'loginUser' : 'registerUser'}`](data);
      const token = dataUser.token;

      if(token){
        localStorage.setItem('authToken', token);
        console.log('Token guardado:', token);
      }
      
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const sesion: Asistance[] = [
    {
      title: 'Ingresar',
    },
    {
      title: 'Registrar',
    },
  ];

  return (
    //* tiene que reconocer el button envia reg o log 
    <>
      <FormContext.Provider value={{ data, setData }}>
        <div className="grid gap-2.5">
          <div className="mx-auto pb-10 w-60 grid place-items-center">
            <img src={logo} className="brightness-0 invert" alt="" />
          </div>
          <div className="p-1 flex justify-between rounded-md bg-muted">
            {sesion.map((obj, i) => (
              <button
                key={i}
                className={`
                  ${i === handleSwitch ? 'bg-background text-foreground' : 'bg-transparent text-muted-foreground'} 
                  px-3 py-1.5 w-full flex justify-center items-center text-sm text-foreground font-medium transition-bg duration-200 ease-in-out outline-none rounded-sm`}
                onClick={() => handleLog(i)}
              >
                {obj.title}
              </button>
            ))}
          </div>
          <form className="px-10 py-6 grid gap-3 border border-border" onSubmit={handleSubmit}>
            {handleSwitch === 0 ? <LogInBody /> : <RegisterBody />}
          </form>
        </div>
      </FormContext.Provider>
    </>
  );
}

export default Form;
