import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeRepository from './repository';
import api from './api';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());

initializeRepository(config).then(repository => {

	app.use('/api', api({ config, repository }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
