import * as R from 'ramda';
import { sanitizeMetadataForSongs } from '../sanitize';

const getSongList = repository => (req, res) => {
  res.json(
    R.pipe(
      repository.filterSongs,
      sanitizeMetadataForSongs
    )(req.query));
};

export default ({ repository }) => ({
  get: getSongList(repository)
});
