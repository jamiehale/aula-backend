const getSong = repository => (req, res) => {
  const song = repository.songsById[req.params.id];
  if (song) {  
    res.json(song);
  } else {
    res.status(404).json({ message: 'Unrecognized song ID' });
  }
};

export default ({ repository }) => ({
  get: getSong(repository)
});
