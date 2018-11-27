import path from 'path';
import fs from 'fs';

const resolveSongFilename = (musicRoot, songFile) => path.join(musicRoot, songFile);

const getSong = (config, repository) => (req, res) => {
  const song = repository.songsById[req.params.id];
  if (song) {
    const filename = resolveSongFilename(config.musicRoot, song.songFile);
    if (!fs.existsSync(filename)) {
      res.status(404).json({ message: 'Song file not found' });
    } else {
      res.download(filename);
    }
  } else {
    res.status(404).json({ message: 'Unrecognized song ID' });
  }
};

export default ({ config, repository }) => ({
  get: getSong(config, repository)
});
