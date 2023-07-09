import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from '../styles/Username.module.css';
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";


function Login({ visible, onClose }) {

	const [auth, setAuth] = useAuth();
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
			const url = `${process.env.REACT_APP_BASE_URL}/api/auth`;
			const { data: res } = await axios.post(url, data);
			toast.success(res.message);
			setAuth({
				...auth,
				user: res.user,
				token: res.data,
			});
			localStorage.setItem("auth", JSON.stringify(res));
			window.location = location.state || "/";

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast.error(error.response.data.message)
			}
		}
	};

	const handleOnClose = (e) => {
		if (e.target.id === "modalcontainer") onClose();
	};

	if (!visible) return null;
	return (
		<div id="modalcontainer" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
			<Toaster position='top-center' reverseOrder={false}></Toaster>
			<div className='flex justify-center items-center h-screen'>
				<div className={styles.glass}>
					<div className="title flex flex-col items-center">
						<h4 className='text-2xl font-bold'>LOGO</h4>
						<span className='py-3 text-base w-2/3 text-center text-black-500'>
							Explore Your Future.
						</span>
					</div>
					<form className='py-1' onSubmit={handleSubmit}>
						<div className="textbox flex flex-col items-center gap-3">
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className={styles.textbox}
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className={styles.textbox}
							/>
							<button className={styles.btn} type='submit'>Let's Go</button>
						</div>

						<div className="text-center py-4">
							<span className='text-black-500'>Don't have an account? <Link className='text-red-500 font-bold' to="/signup">Register Now</Link></span>
						</div>
						<div className="text-center py-3">
							<span className='text-black-500'>Want to register your college? <Link className='text-red-500 font-bold' to="/collegesignup">Click Here</Link></span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;