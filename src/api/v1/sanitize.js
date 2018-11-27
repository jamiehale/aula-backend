import * as R from 'ramda';

const safeFields = [
  'id',
  'title',
  'artist',
  'format',
  'year',
  'genres',
  'tags'
];

export const sanitizeMetadata = songs => songs.map(R.pick(safeFields));
