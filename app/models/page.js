export default (sequelize, DataTypes) => {
    const Page = sequelize.define('page', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        content: {
            type: DataTypes.TEXT
        },
        page: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    return Page;
};