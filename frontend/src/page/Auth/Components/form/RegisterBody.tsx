import { InputWithLabel } from "../../../../components/Custom";
import { Button } from "../../../../components/ui";

function RegisterBody() {
  const fields = [
    {
      label: 'Usuario',
      name: 'user',
      // placeholder: 'nombre',
      type: 'text'
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'turin@example.com',
      type: 'email'
    },
    {
      label: 'Contraseña',
      name: 'password',
      placeholder: '*******',
      type: 'password'
    },
  ];

  return (
    <div className="grid gap-3">
      {fields.map((field, i) => (
        field && (
          <InputWithLabel 
            key={i}
            field={field} // Aseguramos que field siempre se pasa correctamente
          />
        )
      ))}
      <Button 
        className="mt-5" 
        type="submit"
      >
        Crear cuenta
      </Button>
    </div>
  );
}

export default RegisterBody;
