'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define('CategoryProduct', {
  }, {});
  
  CategoryProduct.associate = function(models) {
    // associations can be defined here
    CategoryProduct.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false
      },
    });

    CategoryProduct.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      },
    });
  };
  return CategoryProduct;
};