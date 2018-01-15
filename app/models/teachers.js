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
        },
        youtube_user: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });

    Teachers.associate = (models) => {
        Teachers.belongsTo(models.Categories, {
            as: 'Category',
            foreignKey: 'id_category'
        });
    };

    return Teachers;
};