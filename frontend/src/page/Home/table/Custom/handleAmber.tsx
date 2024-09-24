export function handleAmber() {
  // Verifica si la hora de llegada es posterior a las 8:30 AM
  const isAmber = (time: string): boolean => {
    if (!time) return false;
    // Extraemos "8:45" de "8:45 p. m." o "a. m."
    const timeParts = time.split(' ')[0]; // "8:45"
    const period = time.split(' ').slice(-1).join(' '); // ".a. m." o ".p. m."
    const [arriveHour, arriveMinute] = timeParts.split(':').map(Number);

    // Ajuste para el formato ".p. m." y ".a. m."
    let hour = period.includes('p. m.') && arriveHour !== 12 ? arriveHour + 12 : arriveHour;
    if (period.includes('a. m.') && hour === 12) hour = 0; // Ajuste para medianoche

    const arriveDate = new Date();
    arriveDate.setHours(hour, arriveMinute, 0, 0);

    // Hora de referencia 8:30 AM
    const amberThreshold = new Date();
    amberThreshold.setHours(8, 30, 0, 0);

    // Si el time es mayor a 8:30 AM, retorna true
    return arriveDate.getTime() > amberThreshold.getTime();
  };

  return { isAmber };   
}

