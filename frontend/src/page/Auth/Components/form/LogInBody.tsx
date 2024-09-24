// Ui
import { Button } from "../../../../components/ui";
// Components
import { InputWithLabel } from "../../../../components/Custom";

function LogInBody() {
  const fields = [
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
      Iniciar Seción
    </Button>
  </div>
  )
}

export default LogInBody
