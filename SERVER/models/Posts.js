// Anoymous uFunction to create TABLE

//export the function to be utilized ahead
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        //DEFINE FIELD AND COLUMN WE NEED IN OUR TABLE
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {  // Add this field
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    //Each post might have many diff comments
    //Determine ASSOCIATION: Grab the model (Posts), argmt (models) has access to all the models 
    Post.associate = (models) => {
        Post.hasMany(models.Comments, {
            //When a post gets deleted each comment for that post will automatically get deleted
            onDelete: "cascade"
        });

        Post.hasMany(models.Likes, {
            onDelete: "cascade"
        });

        Post.belongsTo(models.Users, {  // Define the association with User model
            foreignKey: 'UserId',
            onDelete: 'CASCADE',
        });
    };

    return Post;
    //MAKE TABLE APPEAR IN DATABASE by IMPORTING it
}