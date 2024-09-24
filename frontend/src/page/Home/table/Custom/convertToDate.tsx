export default function convertToDate( dateStr: string, timeStr: string ): string | Date {

  if (!timeStr || !timeStr.includes(':')) {
    return ''; // O lanza un error, según sea necesario
  }
  const [hours, minutes] = timeStr.split(':');
  let hours24 = parseInt(hours, 10);

  if (timeStr.includes('p. m.') && hours24 < 12) hours24 += 12;
  if (timeStr.includes('a. m.') && hours24 === 12) hours24 = 0;

  const isoDateTimeString = `${dateStr}T${hours24.toString().padStart(2, '0')}:${minutes.slice(0, 2)}:00.00Z`;
  return new Date(isoDateTimeString).toISOString();
}