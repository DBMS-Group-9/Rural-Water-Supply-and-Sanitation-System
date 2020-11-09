const Multer = require('multer');
const multer = Multer({
	storage: Multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, '../Documents/AttendanceRequest');
		}
	}),
	limits: {
		fileSize: 5 * 1024 * 1024 // no larger than 5mb
	}
});

module.exports = multer;