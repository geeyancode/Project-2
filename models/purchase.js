'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define('Purchases', {
    purchaseId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
  });

  Purchases.associate = function (models) {
    // associations can be defined here
  };
  return Purchases;
};