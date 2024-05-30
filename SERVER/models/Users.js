module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        //DEFINE FIELD AND COLUMN WE NEED IN OUR TABLE
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        });

        //For PROFILE PAGE add a field with UserId
        Users.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return Users;
    //MAKE TABLE APPEAR IN DATABASE by IMPORTING it
}