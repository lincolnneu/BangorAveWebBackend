module.exports = function (app) {

    app.post('/api/company', createCompany);
    app.get('/api/company/:companyName', findCompanyByName);

    const companyModel = require('../models/company/company.model.server');


    function findCompanyByName(req, res) {
        const companyName = req.params['companyName'];
        companyModel.findCompanyByName(companyName)
            .then(company => res.json(company))
    }


    function createCompany(req, res) {
        const company = req.body;
        // console.log(company);
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