var db = require("../models");
const bcrypt = require('bcrypt');
var ls = require('local-storage');

module.exports = function (app) {

  // select user based on email
  app.post("/user/email", function (req, res) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, resPass) {
          if (resPass) {
            // console.log("user  ", user.userId)
            ls.set('UserId', user.userId)
            ls.set('UserName', user.userName)
            ls.set('firstName', user.firstName + " " + user.lastName)
            // console.log("check ", ls("UserId"))
            res.render("index")            
            // Passwords match
          } else {
            res.render("signin", { message: "User or Password incorrect" })
          }
        });
      } else {
        res.render("signin", { message: "The user email is not registered on Unload.com" })
      }
    })
  })


  // select an user based on ID
  app.get("/api/user/:user", function (req, res) {
    //Select all usert types

    db.Users.findOne({
      include: [
        {
          model: db.Accounts,
          include: [db.Banks]
        },
        {
          model: db.UserType
        },
        {
          model: db.Products,
          include: [
            {
              model: db.CategoryProduct,
              include: [db.Categories]
            }
          ]
        }
      ],
      where: {
        userId: req.params.user
      }
    }).then(function (user) {
      // console.log(user);
      db.UserType.findAll({ raw: true })
        .then(resusertype => {
          // res.send(usertype)
          // console.log(resusertype);

          var objUserTypeAll = {
            userTypeAll: resusertype,
            user: user.dataValues
          }
          console.log('this is data', objUserTypeAll)
          // res.render("index", user.dataValues, objUserTypeAll)
          res.render("index", objUserTypeAll)
          // res.json(user);
        });
    });
  });

  // Insert user
  app.post("/api/user", function (req, res) {
    var pass = ""
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      console.log("this is hash:  " + hash)
      pass = hash  // Store hash in database


      var showInformation = false;
      if (req.body.showInformation === 'on') {
        showInformation = true;
      }

      console.log('hola', req.body.userTypeId);
      var userObject = {
        email: req.body.email,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: pass,
        phone: req.body.phone,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        UserTypeUserTypeId: req.body.userTypeId,
        showInformation: showInformation
      }

      db.Users.create(userObject).then(user => {
        // res.json(user);

        // console.log("user  ", user.userId)
        ls.set('UserId', user.userId)
        ls.set('UserName', user.userName)
        ls.set('firstName', user.firstName + " " + user.lastName)

        // console.log("check ", ls("UserId"))
        res.render("index")
        // db.Accounts.create(ObjAccount).then(account =>{

      })
    });
  });

};
