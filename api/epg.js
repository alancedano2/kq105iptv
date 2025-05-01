// api/epg.js
export default function handler(req, res) {
  // Configuración del canal
  const channelId   = "kq105tv";
  const displayName = "KQ105 TV";
  const logoUrl     = "https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png";

  // Horario local (Puerto Rico, UTC–4) de tus programas
  const schedule = [
    { start: "00:00", end: "06:00", title: "Videos Musicales Powered by KQ105" },
    { start: "06:00", end: "10:00", title: "KQ Al Aire con Héctor Ortiz" },
    { start: "10:00", end: "15:00", title: "KQOnline con Alex Diaz" },
    { start: "15:00", end: "18:00", title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
    { start: "18:00", end: "19:00", title: "KQ Al Aire con Pedro Villegas" },
    { start: "19:00", end: "24:00", title: "Videos Musicales Powered by KQ105" },
  ];

  // Fecha de hoy en UTC
  const now      = new Date();
  const year     = now.getUTCFullYear();
  const month    = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day      = String(now.getUTCDate()).padStart(2, "0");

  // Helper para convertir hora local UTC–4 a UTC  
  function toUtcString(localTime) {
    // localTime: "HH:MM"
    const [h, m] = localTime.split(":").map(Number);
    // crea un Date en UTC–4
    const local = new Date(Date.UTC(year, now.getMonth(), now.getDate(), h + 4, m, 0));
    // formatea como "YYYYMMDDhhmmss +0000"
    const YYYY = local.getUTCFullYear();
    const MM   = String(local.getUTCMonth() + 1).padStart(2, "0");
    const DD   = String(local.getUTCDate()).padStart(2, "0");
    const hh   = String(local.getUTCHours()).padStart(2, "0");
    const mm   = String(local.getUTCMinutes()).padStart(2, "0");
    const ss   = String(local.getUTCSeconds()).padStart(2, "0");
    return `${YYYY}${MM}${DD}${hh}${mm}${ss} +0000`;
  }

  // Construye los <programme>…
  let programmes = "";
  schedule.forEach(({ start, end, title }) => {
    const s = toUtcString(start);
    const e = toUtcString(end === "24:00" ? "00:00" : end);
    programmes += `
  <programme start="${s}" stop="${e}" channel="${channelId}">
    <title lang="es">${title}</title>
  </programme>`;
  });

  // Monta el XML completo
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tv>
  <channel id="${channelId}">
    <display-name>${displayName}</display-name>
    <icon src="${logoUrl}" />
  </channel>${programmes}
</tv>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(xml);
}
