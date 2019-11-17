const SIZE_LIMIT = 512 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ['.mp4', '.avi', '.mpeg', '.ogv', '.webm', '.3gp', '.3g2'];
const MINE_TYPES = {
  '.mp4': 'video/mp4',
  '.avi': 'video/x-msvideo',
  '.mpeg': 'video/mpeg',
  '.ogv': 'video/ogg',
  '.webm': 'video/webm',
  '.3gp': 'video/3gpp2',
  '.3g2': 'video/3gpp2',
};

module.exports = {
  ACCEPTED_EXTENSIONS,
  SIZE_LIMIT,
  MINE_TYPES,
};
