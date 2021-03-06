module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.STRING,
        updated: DataTypes.STRING,
    }, {
        timestamps: false,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'userId', as: 'user',
        });
    };

    return BlogPost;
};