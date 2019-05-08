
var db = require("../models");
const Op = require('sequelize').Op;

module.exports = function (app) {

  //Select an array of products, all products
  app.get("/api/products", (req, res) => {
    db.Products.findAll({
      include: [
        {
          model: db.Users,
          include: [db.UserType]
        }
      ]
    })
      .then(product => {
        res.json(product);
      });
  });

  app.get("/api/userProduct/:userId", (req, res) => {
    db.Products.findAll({
      where: {
        UserUserId: {
          [Op.ne]: req.params.userId
        }
      }
    })
      .then(product => {
        res.json(product);
      });
  })

  //Select product based on productId
  app.get("/api/products/:product", function (req, res) {
    db.Products.findOne({
      include: [db.Users],
      where: {
        productId: req.params.product
      }
    }).then(product => {
      res.json(product);
    });
  });

  //Select an array of products based on categoryId
  app.get("/api/products/category/:category", function (req, res) {
    db.Products.findAll({
      where: {
        categoryId: req.params.category
      }
    }).then(function (category) {
      res.json(category);
    });
  });


  app.post("/api/product", function (req, res) {
    var obj = {
      productName: req.body.productName,
      description: req.body.description,
      imgLink: req.body.imgLink,
      used: req.body.used,
      initQuantity: req.body.initQuantity,
      availableQuantity: req.body.availableQuantity,
      soldCounter: req.body.soldCounter,
      price: req.body.price,
      size: req.body.size,
      sellerId: req.body.sellerId,
      categoryId: req.body.categoryId
    }

    db.Products.create(obj).then(function (product) {
      res.json(product);
    });
  });

  // update product
  app.put("/api/product/:productId", function (req, res) {
    db.Products.update(
      {
        productName: req.body.productName,
        description: req.body.description,
        imgLink: req.body.imgLink,
        used: req.body.used,
        initQuantity: req.body.initQuantity,
        availableQuantity: req.body.availableQuantity,
        soldCounter: req.body.soldCounter,
        price: req.body.price,
        size: req.body.size,
        sellerId: req.body.sellerId,
        categoryId: req.body.categoryId
      },
      {
        where: {
          productId: req.params.productId
        },
      }).then(function (product) {
        res.json(product);
      });
  });

  // delete product 
  app.delete("/api/product/:productId", function (req, res) {
    db.Products.destroy({
      where: {
        productId: req.params.productId
      }
    }).then(function (product) {
      res.json(product);
    });
  });
};
