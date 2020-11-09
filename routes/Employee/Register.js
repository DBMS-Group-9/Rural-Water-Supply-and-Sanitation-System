const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config');

/* -------------------------------- registeradmin --------------------------------- */

// async function register(userDetails, { UserID, password, email, company }, role) {
// 	if (userDetails.role === 'SU') {
// 		try {
// 			await Login.create({ UserID, password: bcrypt.hashSync(password, +config.hashsecret), email, company, role });
// 			return { status: 200, response: { message: `${role} Registered Successfully` } };
// 		} catch (error) {
// 			return { status: 409, response: { message: 'UserID/email has been picked by someone already!' } };
// 		}
// 	}
// 	else
// 		return { status: 401, response: { message: `only superuser can register ${role}` } };
// };

// router.post('/admin', (req, res, next) => {
// 	let resdata;
// 	register(req.userDetails, req.body, 'Admin')
// 		.then(message => resdata = message)
// 		.catch(err => resdata = config.errorResponse)
// 		.finally(() => res.status(resdata.status).json(resdata.response));
// });

// /* -------------------------------- registeruser --------------------------------- */

// router.post('/user', (req, res, next) => {
// 	let resdata;
// 	register(req.userDetails, req.body, 'User')
// 		.then(message => resdata = message)
// 		.catch(err => resdata = config.errorResponse)
// 		.finally(() => res.status(resdata.status).json(resdata.response));
// });

module.exports = router;