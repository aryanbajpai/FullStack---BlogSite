module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
  
    return Likes;
  };
  //MAKE TABLE APPEAR IN DATABASE by IMPORTING it