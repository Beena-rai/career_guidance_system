
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import { useCollegeAuth } from "../context/collegeauthContext";
import styles from "../styles/styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CollegeSignIn = () => {
	const [collegeAuth, setCollegeAuth] = useCollegeAuth();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const navigate = useNavigate();
	const location = useLocation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_BASE_URL}/api/collegeauth`;
			const { data: res } = await axios.post(url, data);

			toast.success(res.message);
			setCollegeAuth({
				...collegeAuth,
				college: res.college,
				token: res.data,
			});
			localStorage.setItem("collegeAuth", JSON.stringify(res));
			navigate("/");
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
								<h1>College SignIn</h1>
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
									SignIn
								</button>
								<div className="text-center py-3">
									<span className='text-black-500'>Want to register your college? <Link className='text-red-500 font-bold' to="/collegesignup">Register</Link></span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<img className="background-image-left" src={colorSharp} alt="Image" />
		</section>
	)
}

export default CollegeSignIn