const fs = require('fs');
const path = require('path');
const { ACCEPTED_EXTENSIONS, MINE_TYPES } = require('../config/globalConsts');

function StreamVideos(req, res) {
  const { movie } = req.params;
  const movieFile = path.join(__dirname, '..', '..', 'uploads', `${movie}`);

  if (ACCEPTED_EXTENSIONS.includes(path.extname(movie))) {
    fs.stat(movieFile, (err, stats) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(404).end('Not Found');
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
        'Content-Type': MINE_TYPES[path.extname(movie)],
      });

      res.status(206);

      const stream = fs.createReadStream(movieFile, { start, end });
      return (
        stream.on('open', () => stream.pipe(res)),
        stream.on('error', streamErr => res.end(streamErr))
      );
    });
  } else {
    return res.status(404).end('Not Found');
  }
}

function SendThumbnail(req, res, next) {
  const options = {
    root: path.join(__dirname, '..', '..', 'uploads'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const { thumbnail } = req.params;
  if (path.extname(thumbnail) !== '.jpg') {
    return res.status(404).end('Not Found');
  }

  return res.sendFile(thumbnail, options, (err) => {
    if (err) next(err);
  });
}

module.exports = { StreamVideos, SendThumbnail };
