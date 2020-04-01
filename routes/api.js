const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const signUp = require('../model/signUp');

router.post('/signin', (req, res) => {
	signUp.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, matched) => {
				if (err) return err;
				if (matched) {
					res.json({
						authenticated : true
					});
				} else {
					res.json({
						authenticated : false
					});
				}
			});
		} else {
			res.json({ err: 'user not found' });
		}
	});
});

router.post('/signup', async (req, res) => {
	try {
		let data = req.body;
		const hashedPassword = bcrypt.hashSync(data.password, 10);
		data.password = hashedPassword;
		data.confirm_password = hashedPassword;
		function signupData() {
			return new Promise((resolve, reject) => {
				const newSignUp = new signUp(data);
				resolve(newSignUp);
			});
		}
		const resut = await signupData();
		const savingData = await resut.save();
		const savedData = await res.json(savingData);
	} catch (err) {
		res.status(500).json({ msg: 'Internal server error!!!' });
	}
});

module.exports = router;
