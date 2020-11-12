const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		let decoded = jwt.verify(req.headers.authorization.split(' ')[1], config.secret);
		if (decoded) {
			req.userDetails = decoded;
			console.log(req.userDetails);
			next();
		} else
			throw new Error();
	} catch (err) {
		res.status(401).json({ message: "Invalid Token" });
	}
};