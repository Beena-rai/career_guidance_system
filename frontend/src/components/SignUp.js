
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import { useAuth } from "../context/authContext";
import styles from "../styles/styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
	const [auth] = useAuth();
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_BASE_URL}/api/users`;
			const { data: res } = await axios.post(url, data);
			toast.success(res.message);
			setTimeout(() => {
				navigate('/');
			}, 500);
			// navigate("/");


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<section className="admin" id="admin">
			<NavAll />
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="admin-bx wow zoomIn">
							<form className={styles.form_container} onSubmit={handleSubmit}>
								<h1>Create Account</h1>
								<input
									type="text"
									placeholder="First Name"
									name="firstName"
									onChange={handleChange}
									value={data.firstName}
									required
									className={styles.input}
								/>
								<input
									type="text"
									placeholder="Last Name"
									name="lastName"
									onChange={handleChange}
									value={data.lastName}
									required
									className={styles.input}
								/>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className={styles.input}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
									required
									className={styles.input}
								/>
								{error && <div className={styles.error_msg}>{error}</div>}
								<button type="submit" className={styles.green_btn}>
									Sign Up
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<img className="background-image-left" src={colorSharp} alt="Image" />
		</section>
	)
}

export default Signup