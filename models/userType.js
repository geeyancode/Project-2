'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    userTypeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userTypeName: DataTypes.STRING,
  });

  UserType.associate = function(models) {
    // associations can be defined here
    models.UserType.hasMany(models.Users, {
      onDelete: "cascade"
    });    
  };
  return UserType;
};