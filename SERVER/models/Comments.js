module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {

        //DEFINE FIELD AND COLUMN WE NEED IN OUR TABLE
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Comments;
  };
  //MAKE TABLE APPEAR IN DATABASE by IMPORTING it