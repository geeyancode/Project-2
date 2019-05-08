'use strict';
module.exports = (sequelize, DataTypes) => {
  const shoppingCart = sequelize.define('shoppingCart', {
    ProductProductId:{
      primaryKey : true,
      type: DataTypes.INTEGER
    },
    UserUserId:{
      primaryKey : true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    couponCode: DataTypes.STRING,
  }, {});
  shoppingCart.associate = function (models) {
    models.shoppingCart.belongsTo(models.Products, {});
    // associations can be defined here
  };
  return shoppingCart;
};