module.exports = function (app) {


    app.get('/api/company', findAllCompany);
    app.post('/api/company', createCompany);
    app.put('api/company', updateCompany);
    app.get('/api/company/:companyName', findCompanyByName);

    const companyModel = require('../models/company/company.model.server');



    function updateCompany(req, res) {
        const company = req.body;
        companyModel.updateCompany(company)
            .then(
                () => res.json({success: true})
            )
    }

    function findAllCompany(req, res) {
        companyModel.findAllCompany()
            .then(company => res.json(company))
    }

    function findCompanyByName(req, res) {
        const companyName = req.params['companyName'];
        companyModel.findCompanyByName(companyName)
            .then(company => res.json(company))
    }


    function createCompany(req, res) {
        const company = req.body;
        companyModel
            .findCompanyByName(company.companyName)
            .then(
                (find) => {
                    if(find) {
                        res.json({code: 404, error: 'company name exists'})
                    } else {
                        companyModel
                            .createCompany(company)
                            .then(company => res.json(company));
                    }
                }
            )
    }




};