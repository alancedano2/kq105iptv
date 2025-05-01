import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

export default async function handler(req, res) {
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<tv generator-info-name="kq105.vercel.app">
  <channel id="kq105tv">
    <display-name>KQ105 TV</display-name>
    <icon src="https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png" />
  </channel>

  <programme start="20250501040000 -0400" stop="20250501060000 -0400" channel="kq105tv">
    <title lang="es">Videos Musicales Powered by KQ105</title>
  </programme>
  <programme start="20250501060000 -0400" stop="20250501100000 -0400" channel="kq105tv">
    <title lang="es">KQ Al Aire con Héctor Ortiz</title>
  </programme>
  <programme start="20250501100000 -0400" stop="20250501150000 -0400" channel="kq105tv">
    <title lang="es">KQOnline con Alex Diaz</title>
  </programme>
  <programme start="20250501150000 -0400" stop="20250501180000 -0400" channel="kq105tv">
    <title lang="es">La Tendencia de Molusco con Ali, Pamela y Robert</title>
  </programme>
  <programme start="20250501180000 -0400" stop="20250501190000 -0400" channel="kq105tv">
    <title lang="es">KQ Al Aire con Pedro Villegas</title>
  </programme>
  <programme start="20250501190000 -0400" stop="20250502040000 -0400" channel="kq105tv">
    <title lang="es">Videos Musicales Powered by KQ105</title>
  </programme>
</tv>`;

  try {
    const compressed = await gzipAsync(xml);

    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'inline; filename="epg.xml.gz"');
    res.status(200).send(compressed);
  } catch (error) {
    res.status(500).send('Failed to compress EPG');
  }
}
