import zlib from 'zlib';

export default function handler(req, res) {
  const channelId = 'kq105tv';
  const channelName = 'KQ105 TV';
  const logoUrl = 'https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png';

  const schedule = [
    { start: '00:00', end: '06:00', title: 'Videos Musicales Powered by KQ105' },
    { start: '06:00', end: '10:00', title: 'KQ Al Aire con Héctor Ortiz' },
    { start: '10:00', end: '15:00', title: 'KQOnline con Alex Diaz' },
    { start: '15:00', end: '18:00', title: 'La Tendencia de Molusco con Ali, Pamela y Robert' },
    { start: '18:00', end: '19:00', title: 'KQ Al Aire con Pedro Villegas' },
    { start: '19:00', end: '00:00', title: 'Videos Musicales Powered by KQ105' },
  ];

  function formatTime(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = '00';
    return `${yyyy}${mm}${dd}${hh}${min}${ss} -0400`;
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv generator-info-name="KQ105 EPG">\n`;
  xml += `  <channel id="${channelId}">\n    <display-name>${channelName}</display-name>\n    <icon src="${logoUrl}" />\n  </channel>\n`;

  const now = new Date();
  now.setUTCHours(now.getUTCHours() - 4); // Convertir a UTC-4 (hora de Puerto Rico)

  for (let d = 0; d < 7; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);

    schedule.forEach(item => {
      const [startH, startM] = item.start.split(':');
      const [endH, endM] = item.end.split(':');

      const start = new Date(day);
      start.setHours(parseInt(startH), parseInt(startM), 0);

      const end = new Date(day);
      if (parseInt(endH) < parseInt(startH)) {
        end.setDate(end.getDate() + 1); // pasa de medianoche
      }
      end.setHours(parseInt(endH), parseInt(endM), 0);

      xml += `  <programme start="${formatTime(start)}" stop="${formatTime(end)}" channel="${channelId}">\n`;
      xml += `    <title>${item.title}</title>\n`;
      xml += `  </programme>\n`;
    });
  }

  xml += `</tv>`;

  const buffer = zlib.gzipSync(xml);

  res.setHeader('Content-Type', 'application/gzip');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Disposition', 'inline; filename="epg.xml.gz"');
  res.send(buffer);
}
