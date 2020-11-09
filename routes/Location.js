const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

async function setLocation(Pincode, Panchayat, District) {
    try {

        await connection.query(`INSERT into Locations(Pincode, Panchayat, District) values(${Pincode}, '${Panchayat}', '${District}')`, function (err, result) {
            if(err) throw err;
            return { status: 200, response: { message: "Location Added Successfully!" } };
        });
    } catch (err) {
        return { status: 400, response: { message: err.toString() } };
    }
};

router.post('/setlocation', (req, res, next) => {
    let resdata;
    setLocation(req.body.Pincode, req.body.Panchayat, req.body.District)
        .then(message => resdata = message)
        .catch(err => resdata = config.errorResponse)
        .finally(() => res.status(resdata.status).json(resdata.response));
});

module.exports = router;