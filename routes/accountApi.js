var db = require("../models");

//Accounts of the userId
module.exports = function (app) {
    app.get("/api/account/:user", function (req, res) {
        db.Accounts.findAll({
            include:[db.Banks],            
            where: {
                UseruserId: req.params.user
            }
        }).then(account => {
            res.json(account);
        });
    });

    app.post("/api/account", function (req, res) {
        var accountObject = {
            number: req.body.number,
            initBalance: req.body.ammount,
            balance: req.body.ammount,
            UserUserId: req.body.userId,
            BankBankId: req.body.bankId,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        }

        console.log(req.body)

        db.Accounts.create(accountObject).then(account => {
            res.json(account);
        });
    });
}