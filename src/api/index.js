import { Router } from 'express';
import v1 from './v1';

export default ({ config, repository }) => {
	const api = Router();

	api.use('/v1', v1({ config, repository }));

	return api;
}
