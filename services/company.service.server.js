module.exports = function (app) {


    app.get('/api/company', findAllCompany);
    app.post('/api/company', createCompany);
    app.put('/api/company', updateCompany);
    app.delete('/api/company/:companyName', deleteCompanyByName);
    app.get('/api/company/:companyName', findCompanyByName);

    const companyModel = require('../models/company/company.model.server');



    function updateCompany(req, res) {
        const company = req.body;
        // console.log(company)
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
        // console.log(company);
        companyModel
            .findCompanyByName(company.companyName)
            .then(
                (find) => {
                    // console.log(find);
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

    function deleteCompanyByName(req, res) {
        console.log("goes here.")
        const companyName = req.params['companyName'];
        companyModel
          .deleteCompanyByName(companyName)
          .then(
          () => res.json({code: 0})
        )
    }




};