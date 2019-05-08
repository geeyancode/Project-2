'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banks = sequelize.define('Banks', {
    bankId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bankName: DataTypes.STRING
  });
  Banks.associate = function(models) {
    // associations can be defined here
    models.Banks.hasMany(models.Accounts, {
        onDelete: "cascade"
      });
  };
  return Banks;
};