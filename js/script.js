function addCalendar(){
  // Separamos el "03-10-2026" en [ "03", "10", "2026" ]
  const partes = CONFIG.fechaISO.split("-");
  // Lo ordenamos correctamente como "20261003"
  const fechaFormateada = partes[2] + partes[1] + partes[0]; 
  
  const start = fechaFormateada + "T" + CONFIG.hora.replace(":", "") + "00";
  
  // Creamos la fecha base para calcular la duración
  const d = new Date(partes[2], partes[1] - 1, partes[0], 22, 30);
  const end = new Date(d.getTime() + 4 * 60 * 60 * 1000);
  
  const pad = n => String(n).padStart(2, "0");
  const fmt = x => x.getFullYear() + pad(x.getMonth() + 1) + pad(x.getDate()) + "T" + pad(x.getHours()) + pad(x.getMinutes()) + "00";
  
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTART:" + start,
    "DTEND:" + fmt(end),
    "SUMMARY:Cumpleaños de 18 — " + CONFIG.nombre,
    "LOCATION:" + CONFIG.lugar,
    "DESCRIPTION:Cumpleaños de 18. ¡Nos vemos!",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  
  const blob = new Blob([ics], {type: "text/calendar"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cumpleanos-18.ics";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("Calendario preparado");
}
