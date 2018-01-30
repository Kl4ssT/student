import dotenv from 'dotenv';
import config from 'config';
import envs from './constants/envs';
import env, { IS_TEST } from './utils/env';

dotenv.config();

if (!envs[env])
    throw new Error(`Unknown env: '${env}'`);

const PORT = process.env.PORT || config.get('port');
const DB = {
    database: process.env.DATABASE || config.get('sequelize.database'),
    username: process.env.DBUSER || config.get('sequelize.username'),
    password: process.env.PASSWORD || config.get('sequelize.password'),
    dialect: process.env.DIALECT || config.get('sequelize.dialect'),
};

const YOUTUBE = {
    apikey: process.env.YOUTUBE_API || config.get('youtube.apikey'),
    client_id: process.env.YOUTUBE_CLIENT_ID || config.get('youtube.client_id'),
    secret: process.env.YOUTUBE_SECRET_KEY || config.get('youtube.secret')
};

const JWT_SECRET = config.get('jwt.secret');

export {
    PORT,
    DB,
    YOUTUBE,
    JWT_SECRET
};
