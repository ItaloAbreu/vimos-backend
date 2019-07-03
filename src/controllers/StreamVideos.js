const fs = require('fs');
const path = require('path');

function StreamVideos(req, res) {
  const { movie } = req.params;
  const movieFile = path.join(__dirname, '..', '..', 'uploads', `${movie}`);

  fs.stat(movieFile, (err, stats) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(404).end(`<h1>'${movie}' Not Found</h1>`);
    }

    // Variaveis para montar o chunk header
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
    const end = size - 1;
    const chunkSize = (end - start) + 1;

    // Headers do chunk
    res.set({
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });

    res.status(206);

    const stream = fs.createReadStream(movieFile, { start, end });
    return (
      stream.on('open', () => stream.pipe(res)),
      stream.on('error', streamErr => res.end(streamErr))
    );
  });
}

module.exports = StreamVideos;
