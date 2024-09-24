export interface Color {
  green: boolean;
  amber: boolean;
  red: boolean;
  blue: boolean;
  absent?: boolean; // Añade esta línea si deseas que `absent` sea opcional
}

// export interface DataStaff {
//   name: string;
//   arriveTime: string;
//   departureTime: string;
//   date: string;
// }

export interface DataStaff {
  _id: string,
  name: string;
  date: string;
  arrivalTime: string;
  departureTime: string;
  status: string
}