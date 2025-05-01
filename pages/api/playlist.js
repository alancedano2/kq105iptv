export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/x-mpegURL');
  res.send(`#EXTM3U
#EXTINF:-1 tvg-id="kq105tv" tvg-name="KQ105 TV" tvg-logo="https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/23c304fa-a5bb-11ee-aed9-ab40ab64f7be.png" group-title="Puerto Rico",KQ105 TV
https://ssh101stream.ssh101.com/akamaissh101/ssh101/kq105/playlist.m3u8
`);
}
