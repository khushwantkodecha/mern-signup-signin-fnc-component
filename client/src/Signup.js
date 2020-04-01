import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';

function Signup() {
	const [ first_name, setFirstName ] = useState('');
	const [ last_name, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirm_password, setCofirmPassword ] = useState('');
	const [ first_name_error, setFirstNameError ] = useState('');
	const [ email_error, setEmailError ] = useState('');
	const [ password_error, setPasswordError ] = useState('');
	const [ confirm_password_error, setCofirmPasswordError ] = useState('');

	let signupHandler = async (payload) => {
		try {
			await axios({
				url    : '/api/signup',
				method : 'POST',
				data   : payload
			});
			Swal.fire('Success', 'User Created successfully!', 'success');
		} catch (e) {
			console.log('data not saved');
		}
	};

	const sumbitHandler = () => {
		errorReset();
		const validated = validateForm();
		if (validated) {
			const payload = {
				first_name       : first_name,
				last_name        : last_name,
				email            : email,
				password         : password,
				confirm_password : confirm_password
			};

			signupHandler(payload);
		}
	};

	const validateForm = () => {
		let isError = false;
		if (first_name.trim().length < 4) {
			setFirstNameError('First name should be more than 4 charecters');
			isError = true;
		}
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
		if (confirm_password != password) {
			setCofirmPasswordError('Password should be matched!');
			isError = true;
		}
		if (!confirm_password.trim().length) {
			setCofirmPasswordError('Confirm Password can not be blank');
			isError = true;
		}
		if (isError) {
			return false;
		}
		return true;
	};

	const errorReset = () => {
		setFirstNameError('');
		setEmailError('');
		setPasswordError('');
		setCofirmPasswordError('');
	};

	// const clearForm = () => {
	//   this.setState({
	//     first_name: "",
	//     last_name: "",
	//     email: "",
	//     password: "",
	//     confirm_password: ""
	//   });
	// };

	useEffect(() => {
		console.log(first_name);
		console.log(last_name);
		console.log(email);
		console.log(password);
		console.log(confirm_password);
		// console.log(first_name);
	});
	return (
		<div>
			<div className="row">
				<div className="col-3" />
				<div className="col-6 mt-5">
					<h1 className="text-center">REGISTER</h1>
					<p className="text-center">Create your account. It's free and only takes a minute.</p>
					<div className="row mt-3">
						<div className="col-6">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="first_name"
									name="first_name"
									placeholder="First Name*"
									value={first_name}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								{first_name_error.length ? (
									<small style={{ color: 'red' }}>{first_name_error}</small>
								) : null}
							</div>
						</div>
						<div className="col-6">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="last_name"
									name="last_name"
									placeholder="Last Name"
									value={last_name}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12">
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder="Email*"
									value={email}
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
									value={password}
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
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									id="confirm_password"
									name="confirm_password"
									value={confirm_password}
									placeholder="Confirm Password*"
									onChange={(e) => setCofirmPassword(e.target.value)}
								/>
								{confirm_password_error.length ? (
									<small style={{ color: 'red' }}>{confirm_password_error}</small>
								) : null}
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12">
							<div className="form-group text-center">
								<button className="btn btn-primary w-100" onClick={sumbitHandler}>
									Register Now
								</button>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-12 text-center">
							<a href="/sign-in" style={{ textDecoration: 'none' }}>
								Already have an account?
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
