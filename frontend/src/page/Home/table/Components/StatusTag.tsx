import { statusStyle } from "../../../../config/status";

interface Color {
  green: boolean;
  amber: boolean;
  red: boolean;
  blue: boolean;
}

export function StatusTag({ color }: { color: Color }) {
  // Encuentra el primer estado activo
  const statusColor = Object.keys(color).find(key => color[key as keyof Color]) || 'absent';

  // Obtiene las propiedades correspondientes al estado activo
  const { text, classes } = statusStyle[statusColor] || { text: '', classes: '' };

  return (
    <div
      className={`px-2.5 py-0.5 inline-flex items-center rounded-md text-xs font-semibold ${classes}`}
    >
      {text}
    </div>
  );
}

