'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    imgLink: DataTypes.STRING,
    used: DataTypes.BOOLEAN,
    initQuantity: DataTypes.INTEGER,
    availableQuantity: DataTypes.INTEGER,
    soldCounter: DataTypes.INTEGER,
    uploadDate: DataTypes.DATE,
    price: DataTypes.DECIMAL(10, 2),
    size: DataTypes.INTEGER,
  }, {});
  Products.associate = function (models) {
    // associations can be defined here
    models.Products.hasMany(models.CategoryProduct, {
      onDelete: "cascade"
    });

    models.Products.hasMany(models.Purchases, {
      onDelete: "cascade",
      primaryKey: true
    });
    
    models.Products.hasMany(models.shoppingCart, {
      onDelete: "cascade",
      primaryKey: true
    });

    Products.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      },
    });

  };
  return Products;
};