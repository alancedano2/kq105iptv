import zlib from 'zlib';

export default function handler(req, res) {
  const epgXml = `<?xml version="1.0" encoding="UTF-8"?>
<tv generator-info-name="KQ105 EPG">
  <channel id="kq105tv">
    <display-name>KQ105 TV</display-name>
    <icon src="https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png" />
  </channel>

  <programme start="20250501040000 -0400" stop="20250501010000 -0400" channel="kq105tv">
    <title>Videos Musicales Powered by KQ105</title>
  </programme>
  <programme start="20250501010000 -0400" stop="20250501060000 -0400" channel="kq105tv">
    <title>KQ Al Aire con Héctor Ortiz</title>
  </programme>
  <programme start="20250501060000 -0400" stop="20250501110000 -0400" channel="kq105tv">
    <title>KQOnline con Alex Diaz</title>
  </programme>
  <programme start="20250501110000 -0400" stop="20250501140000 -0400" channel="kq105tv">
    <title>La Tendencia de Molusco con Ali, Pamela y Robert</title>
  </programme>
  <programme start="20250501140000 -0400" stop="20250501150000 -0400" channel="kq105tv">
    <title>KQ Al Aire con Pedro Villegas</title>
  </programme>
  <programme start="20250501150000 -0400" stop="20250502040000 -0400" channel="kq105tv">
    <title>Videos Musicales Powered by KQ105</title>
  </programme>
</tv>`;

  const buffer = zlib.gzipSync(epgXml);

  res.setHeader('Content-Type', 'application/gzip');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Disposition', 'inline; filename="epg.xml.gz"');
  res.send(buffer);
}
