export default (sequelize, DataTypes) => {
    const Categories = sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        icon: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    Categories.associate = (models) => {
        Categories.hasMany(models.teachers, {
            as: 'Teachers',
            foreignKey: 'id'
        });
    };

    return Categories;
};