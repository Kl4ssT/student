import jwt from 'jsonwebtoken';
import models from "../db";
import {JWT_SECRET} from "../config";

const authMiddleware = async (ctx, next) => {
    const { authorization } = ctx.headers;

    if (!authorization) ctx.throw(401);

    const { login } = await jwt.verify(authorization, JWT_SECRET);

    if (!login) ctx.throw(401);

    const user = await models.admins.findOne({ login });

    if (!user) ctx.throw(400);

    ctx.user = user;

    await next();
};

export default authMiddleware;