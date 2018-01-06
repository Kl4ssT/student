export default (sequelize, DataTypes) => {
    const Teachers = sequelize.define('Teachers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_category: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        photo: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: (models) => {
                Teachers.belongsTo(models.Categories, {
                    through: 'Category',
                    foreignKey: 'categoryIndex',
                    onDelete: 'cascade'
                })
            }
        }
    });

    return Teachers;
};