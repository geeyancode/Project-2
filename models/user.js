'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    showInformation : DataTypes.BOOLEAN
  });
  Users.associate = function (models) {
    // associations can be defined here
    models.Users.hasMany(models.Accounts, {
      onDelete: "cascade"
    });

    models.Users.hasMany(models.Purchases, {
      onDelete: "cascade",
      primaryKey: true
    });

    models.Users.hasMany(models.shoppingCart, {
      onDelete: "cascade",
      primaryKey: true
    });
    
    models.Users.belongsTo(models.UserType, {
      onDelete: "cascade"
    })

    models.Users.hasMany(models.Products, {
      onDelete: "cascade"
    })

  };
  return Users;
};