const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = require('../model/users');

//for sign in of created user
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

//for crating a new user
router.post('/signup', (req, res) => {
	let data = req.body;
	bcrypt
		.hash(data.password, 10)
		.then((hash) => {
			data.password = hash;
			data.confirm_password = hash;

			const newUser = new users(data);

			newUser
				.save()
				.then((savedUser) => {
					res.json(savedUser);
				})
				.catch((err) => {
					res.status(500).json({ msg: `Internal server error!!! ${err}` });
				});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
