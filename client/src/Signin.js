import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

function Signin() {
	const [ email, setEmail ] = useState('');
	const [ email_error, setEmailError ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ password_error, setPasswordError ] = useState('');

	let signinHandler = async (payload) => {
		try {
			let x = await axios({
				url    : '/api/signin',
				method : 'POST',
				data   : payload
			});
			x.data.err
				? Swal.fire('Opps...', 'User does not exist!', 'error')
				: x.data.authenticated
					? Swal.fire('Success', 'User logged in successfully!', 'success')
					: Swal.fire('Opps...', 'Please enter correct password!', 'error');
		} catch (e) {
			console.log('error occured');
		}
	};

	const sumbitHandler = () => {
		errorReset();
		const validated = validateForm();
		if (validated) {
			const payload = {
				email    : email,
				password : password
			};

			signinHandler(payload);
		}
	};

	const validateForm = () => {
		let isError = false;

		if (!email.includes('@') || !email.includes('.')) {
			setEmailError('Invalid email');
			isError = true;
		}
		if (!email.trim().length) {
			setEmailError('Email can not be blank');
			isError = true;
		}
		if (password.trim().length < 6) {
			setPasswordError('Password shold be more than 6 characters');
			isError = true;
		}
		if (!password.trim().length) {
			setPasswordError('Password can not be blank');
			isError = true;
		}
		if (isError) {
			return false;
		}
		return true;
	};

	const errorReset = () => {
		setEmailError('');
		setPasswordError('');
	};

	return (
		<div>
			<div className="row">
				<div className="col-3" />
				<div className="col-6 mt-5">
					<h1 className="text-center">SIGN IN</h1>
					<div className="row mt-3">
						<div className="col-12">
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder="Email*"
									onChange={(e) => setEmail(e.target.value)}
								/>
								{email_error.length ? <small style={{ color: 'red' }}>{email_error}</small> : null}
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12">
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									placeholder="Password*"
									onChange={(e) => setPassword(e.target.value)}
								/>
								{password_error.length ? (
									<small style={{ color: 'red' }}>{password_error}</small>
								) : null}
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12">
							<div className="form-group text-center">
								<button className="btn btn-primary w-100" onClick={sumbitHandler}>
									Sign In
								</button>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12 text-center">
							<a href="/" style={{ textDecoration: 'none' }}>
								Don't have an account?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin;
