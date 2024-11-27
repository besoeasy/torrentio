import axios from "axios";

const scraper = "https://torrentio.strem.fun/sort=seeders";

function getImdbId(url) {
  const match = url.match(/(tt\d{7,8})/);
  return match ? match[1] : null;
}

async function fetchTorrent(contentid) {
  const urltype = contentid.includes(":") ? "series" : "movie";

  const response = await axios.get(
    scraper + "/stream/" + urltype + "/" + contentid + ".json",
    { timeout: 2000 }
  );

  const torrentdatafinal = response.data.streams;

  const torrents = [];

  for (let i = 0; i < torrentdatafinal.length; i++) {
    torrents.push({
      title: torrentdatafinal[i].title,
      magnet: "magnet:?xt=urn:btih:" + torrentdatafinal[i].infoHash,
      fileIdx: torrentdatafinal[i].fileIdx || 0,
    });
  }

  return torrents;
}

export { fetchTorrent, getImdbId };
