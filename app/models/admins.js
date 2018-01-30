import crypto from 'crypto';

export default (sequelize, DataTypes) => {
    const Admins = sequelize.define('admins', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    Admins.beforeCreate((model, options, cb) => {
        model.password = crypto.pbkdf2Sync(model.password, crypto.randomBytes(128).toString('base64'), 1, 128, 'sha1');
    });

    return Admins;
};