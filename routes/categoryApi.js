var db = require("../models");
var ls = require('local-storage');

module.exports = function (app) {

    // select all categories return an array of categories
    app.get("/api/categories", function (req, res) {
        db.Categories.findAll({}).then(function (categories) {
            
            var userName = ls.get('firstName');

            var obj = {
                categories: categories,
                user : userName
            }
            
            res.json(obj);
        });
    });

    //Select one category based on categoryId
    app.get("/api/categories/:category", function (req, res) {
        db.Categories.findOne({
            where: {
                categoryId: req.params.category
            }
        }).then(category => {
            res.json(category);
        });
    });

    //Select one category based on ProductId
    app.get("/categories/:productId", function (req, res) {
        db.Categories.findOne({
            include: [{
                model: [db.CategoryProduct],
                where: {
                    ProductProductId: req.params.productId
                }
            }
            ]
        }).then(category => {
            res.json(category);
        });
    });
};
