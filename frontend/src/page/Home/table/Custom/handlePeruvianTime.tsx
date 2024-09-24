export function handlePeruvianTime() {
  const getPeruvianTime = (isPM: boolean = false) => {
      const now = new Date();
      const utcOffset = -5; // Offset de Perú
      const localTime = new Date(now.getTime() + (utcOffset - now.getTimezoneOffset() / 60) * 3600 * 1000);
      
      if (isPM) {
        localTime.setHours(18, 0, 0); // 6:00 PM
      } else {
        localTime.setHours(6, 0, 0); // 6:00 AM
      }
    
      return localTime.toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return { getPeruvianTime }
}
