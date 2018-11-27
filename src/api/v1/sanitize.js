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

export const sanitizeMetadataForSong = song => R.pick(safeFields, song);
export const sanitizeMetadataForSongs = songs => songs.map(sanitizeMetadataForSong);
