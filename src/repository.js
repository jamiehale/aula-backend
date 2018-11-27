import fs from 'fs';
import * as R from 'ramda';

const loadDbFile = filename => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(JSON.parse(data));
			}
		});
	});
};

const fieldRegExp = s => new RegExp('.*' + s + '.*', 'i');
const matchField = (field, s) => song => song[field].match(fieldRegExp(s));

const songsWithPropLike = field => (s, songs) => songs.filter(matchField(field, s));
const songsWithPropEqual = field => (s, songs) => songs.filter(song => song[field] === s);
const songsWithPropIncluding = field => (s, songs) => songs.filter(song => song[field].includes(s));

const songsWithArtistLike = songsWithPropLike('artist');
const songsWithTitleLike = songsWithPropLike('title');
const songsWithFormat = songsWithPropEqual('format');
const songsWithYear = songsWithPropEqual('year');
const songsWithGenre = songsWithPropIncluding('genres');
const songsWithTag = songsWithPropIncluding('tags');

const filterSongsBy = (value, f) => songs => {
  return value ? f(value, songs) : songs;
};

const filterSongs = songs => query => R.pipe(
  filterSongsBy(query.artist, songsWithArtistLike),
  filterSongsBy(query.title, songsWithTitleLike),
  filterSongsBy(query.format, songsWithFormat),
  filterSongsBy(query.year, songsWithYear),
  filterSongsBy(query.genre, songsWithGenre),
  filterSongsBy(query.tag, songsWithTag)
)(songs);

const createSongsById = songs => songs.reduce((index, song) => ({ ...index, [song.id]: song }), {});

const createRepository = db => ({
	...db,
	songsById: createSongsById(db.songs),
	filterSongs: filterSongs(db.songs)
});

export default async config => {
	return loadDbFile(config.musicDbFilename).then(createRepository);
};
