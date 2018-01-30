export default (sequelize, DataTypes) => {
    const Subscribers = sequelize.define('subscribers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_teacher: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });

    return Subscribers;
};