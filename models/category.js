'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryName: DataTypes.STRING
  });
  Categories.associate = function(models) {
    // associations can be defined here
    models.Categories.hasMany(models.CategoryProduct, {
      onDelete: "cascade"
    });
  };
  return Categories;
};