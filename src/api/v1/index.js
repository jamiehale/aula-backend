import { Router } from 'express';
import { version } from '../../../package.json';
import songController from './controllers/song';
import songListController from './controllers/song-list';
import songFileController from './controllers/song-files';

const getVersion = version => (req, res) => {
	res.json({ version });
};

export default ({ config, repository }) => {
	const api = Router();

	api.get('/', getVersion(version));
	api.get('/songs', songListController({ repository }).get);
	api.get('/songs/:id', songController({ repository }).get);
	api.get('/song-files/:id', songFileController({ config, repository }).get);

	return api;
}
