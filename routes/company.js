var CompanyModel = require("../models/company");

var appRouter = function(app) {

    app.get("/api/company/get/:companyId", function(req, res) {
        if(!req.params.companyId) {
            return res.status(400).send({"status": "error", "message": "A company id is required"});
        }
        CompanyModel.getById(req.params.companyId, function(error, company) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(comapny);
        });
    });

    app.get("/api/company/getAll", function(req, res) {
        CompanyModel.find({}, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.post("/api/company/create", function(req, res) {
        var company = new CompanyModel({
            name: req.body.name,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                country: req.body.country
            },
            phone: req.body.phone,
            website: req.body.website
        });
        company.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(req.body);
        });
    });

};

module.exports = appRouter;
