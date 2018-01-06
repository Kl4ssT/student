export default (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
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
        timestamps: false,
        classMethods: {
            associate: (models) => {
                Categories.hasMany(models.Teachers, {
                    through: 'Teachers',
                    foreignKey: 'teacherIndex',
                    onDelete: 'cascade'
                })
            }
        }
    });

    return Categories
};