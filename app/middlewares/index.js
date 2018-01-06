import compose from 'koa-compose';
import convert from 'koa-convert';

import { IS_DEV } from '../config';

import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

export default () => {
    const middlewares = [];
    middlewares.push(convert(cors()));
    middlewares.push(convert(bodyParser()));

    if (IS_DEV)
        middlewares.push(logger());

    return compose(middlewares);
}