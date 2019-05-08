'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imgLink: {
        type: Sequelize.STRING
      },
      used: {
        type: Sequelize.BOOLEAN
      },
      initQuantity: {
        type: Sequelize.INTEGER
      },
      availableQuantity: {
        type: Sequelize.INTEGER
      },
      soldCounter: {
        type: Sequelize.INTEGER
      },
      uploadDate: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.NUMBER
      },
      sellerId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};