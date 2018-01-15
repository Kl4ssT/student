import compose from 'koa-compose';
import convert from 'koa-convert';

import { IS_DEV } from '../config';

import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import serve from 'koa-static';

import path from 'path';

export default () => {
    const middlewares = [];
    middlewares.push(convert(cors()));
    middlewares.push(convert(bodyParser()));
    middlewares.push(convert(serve('assets')));

    if (IS_DEV)
        middlewares.push(logger());

    return compose(middlewares);
}