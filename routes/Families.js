const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

async function addFamily(Persons, FHead, Consumption, FContact, Pincode) {
    try {

        await connection.query(`INSERT into Employees(Persons, FHead, Consumption, FContact, Pincode) values(${Persons},'${FHead}',${Consumption},${FContact},${Pincode})`, function (err, result) {
            if(err) throw err;
            return { status: 200, response: { message: "Family Added Successfully!" } };
        });
    } catch (err) {
        return { status: 400, response: { message: err.toString() } };
    }
};

router.post('/addfamily', (req, res, next) => {
    let resdata;
    addFamily(req.body.Persons, req.body.FHead, req.body.Consumption, req.body.FContact, req.body.Pincode)
        .then(message => resdata = message)
        .catch(err => resdata = config.errorResponse)
        .finally(() => res.status(resdata.status).json(resdata.response));
});

module.exports = router;

