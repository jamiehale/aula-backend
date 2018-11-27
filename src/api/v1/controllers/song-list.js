import * as R from 'ramda';
import { sanitizeMetadata } from '../sanitize';

const getSongList = repository => (req, res) => {
  res.json(
    R.pipe(
      repository.filterSongs,
      sanitizeMetadata
    )(req.query));
};

export default ({ repository }) => ({
  get: getSongList(repository)
});
