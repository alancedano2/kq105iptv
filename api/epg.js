export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");
  const now = new Date();
  const baseDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const pad = n => String(n).padStart(2, "0");

  const getTime = (h) => {
    const date = new Date(baseDate.getTime() + h * 3600000);
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}${pad(date.getUTCHours())}0000 +0000`;
  };

  const schedule = [
    { start: 0, end: 6, title: "Videos Musicales Powered by KQ105" },
    { start: 6, end: 10, title: "KQ Al Aire con Héctor Ortiz" },
    { start: 10, end: 15, title: "KQOnline con Alex Diaz" },
    { start: 15, end: 18, title: "La Tendencia de Molusco con Ali, Pamela y Robert" },
    { start: 18, end: 19, title: "KQ Al Aire con Pedro Villegas" },
    { start: 19, end: 24, title: "Videos Musicales Powered by KQ105" }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<tv generator-info-name="KQ105 EPG" source-info-name="KQ105" source-info-url="https://kq105.vercel.app">\n`;
  xml += `<channel id="kq105tv">\n`;
  xml += `<display-name>KQ105 TV</display-name>\n`;
  xml += `<icon src="https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png" />\n`;
  xml += `</channel>\n`;

  for (const slot of schedule) {
    xml += `<programme start="${getTime(slot.start)}" stop="${getTime(slot.end)}" channel="kq105tv">\n`;
    xml += `<title lang="es">${slot.title}</title>\n`;
    xml += `<desc lang="es">${slot.title}</desc>\n`;
    xml += `</programme>\n`;
  }

  xml += `</tv>`;
  res.send(xml);
}
