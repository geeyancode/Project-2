'use strict';
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define('States', {
    stateId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stateCode: DataTypes.STRING,
    stateName: DataTypes.STRING
  });

  States.associate = function(models) {
    // associations can be defined here    
  };
  return States;
};