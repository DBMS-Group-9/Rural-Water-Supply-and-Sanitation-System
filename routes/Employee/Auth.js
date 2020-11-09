const express = require('express');
const router = express.Router();
const config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* -------------------------------- login --------------------------------- */

// async function login(UserID, password) {
// 	try {
// 		let user = await Login.findOne({ UserID: UserID });
// 		if (bcrypt.compareSync(password, user.password)) {
// 			let token = jwt.sign({ UserID: user.UserID, role: user.role }, config.secret
// 				// , { expiresIn: '0.5h' }
// 			);
// 			return { status: 200, response: { token, company: user.company, expiration: '1800', role: user.role } };
// 		}
// 		else
// 			throw Error();
// 	} catch (err) {
// 		return { status: 401, response: { message: 'Incorrect Username/Password' } };
// 	}
// };

// router.post('/login', (req, res, next) => {
// 	let resdata;
// 	login(req.body.UserID, req.body.password)
// 		.then(message => resdata = message)
// 		.catch(err => resdata = config.errorResponse)
// 		.finally(() => res.status(resdata.status).json(resdata.response));
// });

module.exports = router;