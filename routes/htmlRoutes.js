// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var ls = require('local-storage');
var stripe = require("stripe")("sk_test_ImIMOUWDAJKtwCrDymTb8u9k00aVI0ZHEM");
// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (req, res) => {

    // console.log("check ", ls("UserId"))
    res.render("index")
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/cart", (req, res) => {
    var userId = ls.get("UserId");
    console.log("Body: ", req.body, userId)

    if (userId) {
      db.shoppingCart.findAll({
        raw: true,
        where: {
          UserUserId: userId
        },

        include: [{
          model: db.Products,
          include: [{
            model: db.CategoryProduct,
            include: [db.Categories]
          }]
        }]
      }).then(shoppingCart => {
        console.log("Cart", shoppingCart)
        
        if (shoppingCart[0]) {
          // console.log("nothing")
          shoppingCart.forEach(item => item.categoryName = item['Product.CategoryProducts.Category.categoryName'])
          shoppingCart.forEach(item => item.imgLink = item['Product.imgLink'])
          shoppingCart.forEach(item => item.productName = item['Product.productName'])
          shoppingCart.forEach(item => item.subtotalValue = (item['price'] * item['quantity']).toFixed(2))
          shoppingCart.forEach(item => item.productDescription = item['Product.description'])
          shoppingCart.forEach(item => item.productId = item['Product.productId'])


          // console.log(shoppingCart)
          // shoppingCart.forEach(item => item.categoryName = item['Product.CategoryProducts.Category.categoryName'])

          var indexFinal = shoppingCart.length - 1;
          var newproduct = []
          var total = 0


          // Procedure to delete duplicate products
          for (let i = 0; i < shoppingCart.length - 1; i++) {

            console.log(shoppingCart[i].subtotalValue, shoppingCart[i + 1].ProductProductId, shoppingCart.length, total)
            const element = shoppingCart[i];
            const element2 = shoppingCart[i + 1];

            if (element.ProductProductId != element2.ProductProductId) {
              newproduct.push(element)
              total += parseFloat(element.subtotalValue);
            }
          }
          // push the last element
          total += parseFloat(shoppingCart[indexFinal].subtotalValue);
          newproduct.push(shoppingCart[indexFinal])

          console.log("total", total)

          var objUserTypeAll = {
            products: newproduct,
            total: total.toFixed(2),
            total2 : total + "00"
          }

          res.render("shoppingcart", objUserTypeAll)
        }else{
          res.send("noItems")
          // res.send("noItems")
        }
      })
    }
    else {
      res.send("noUser");
      // res.render("shoppingcart");
    }
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Sign up request
  app.get("/signup", function (req, res) {
    // console.log(user);
    db.UserType.findAll({ raw: true })
      .then(resusertype => {

        db.States.findAll({ raw: true })
          .then(resStates => {

            var objUserTypeAll = {
              userTypeAll: resusertype,
              states: resStates
            }
            console.log('this is data', objUserTypeAll)
            // res.render("index", user.dataValues, objUserTypeAll)
            res.render("signup", objUserTypeAll)
            // res.json(user);
          });
      });
  });

  // SignIn request
  app.get("/signin", (req, res) => {
    res.render("signin");
  })

  // LogOut request
  app.get("/signout", (req, res) => {

    // Remove local storage var
    ls.clear()

    res.render("index");
  })

  app.post('/paysuccess', function (req, res) {
    res.render('paysuccess', {

    });
  });

  app.post('/charge', function (req, res) {
    var token = req.body.stripeToken;

    var charge = stripe.charges.create({
      amount: 1700, // create a charge for 1700 cents USD ($17)
      currency: 'usd',
      description: 'Bargain Basement Charge',
      source: token,
    }, function (err, charge) {
      if (err) { console.warn(err) } else {
        res.status(200).send(charge)
      }
    })
  });

  // bring the information and render the products page
  app.get("/products/:categoryId", (req, res) => {
    db.Products.findAll({
      // plain:true,
      raw: true,
      // hierarchy: true,
      include: [
        {
          model: db.CategoryProduct,
          where: {
            CategoryCategoryId: req.params.categoryId
          },
        }
      ],
    }).then(function (product) {

      db.Categories.findOne({
        raw: true,
        where:
        {
          categoryId: req.params.categoryId
        }
      }).then(category => {

        var objProduct = {
          products: product,
          category: category,
        }

        // console.log(objProduct)
        res.render("product", objProduct);
      });
    });
  })

  // bring all products
  app.get("/products", (req, res) => {
    db.Products.findAll({
      // plain:true,
      raw: true,
      // hierarchy: true,
      include: [{
        model: db.CategoryProduct,
        include: [db.Categories]
      }
      ],
    })
      .then(function (product) {

        // console.log(product[0]['CategoryProducts.Category.categoryName'])
        // console.log('see above hhhh')
        product.forEach(item => item.categoryName = item['CategoryProducts.Category.categoryName'])

        
        // console.log('after')
        // console.log(product)
        var indexFinal = product.length - 1;
        var newproduct = []

        // Procedure to delete duplicate products
        for (let i = 0; i < product.length - 1; i++) {

          console.log(product[i].productId, product[i + 1].productId, product.length)
          const element = product[i];
          const element2 = product[i + 1];

          if (element.productId != element2.productId) {
            newproduct.push(element)
          }
        }
        // push the last element
        newproduct.push(product[indexFinal])

        var objProduct = {
          products: newproduct,
        }
        // console.log(objProduct)
        res.render("product", objProduct);
      });
  })
};
