
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavStudent} from './NavStudent';
import { useAuth } from "../context/authContext";

import styles from "../styles/styles.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useState,useEffect } from "react";
import { HashLink } from 'react-router-hash-link';


const Profile = () => {
  const [auth,setAuth] = useAuth();
  const [data, setData] = useState({
	firstName: "",
	lastName : "",
	email: "",
  phone:"",
	mark10  : "",
	mark12: "",
});

 //get user data
 useEffect(() => {
  const { firstName,lastName,email,phone,mark10,mark12} = auth?.user;
  setData({firstName,lastName,email,phone,mark10,mark12});
}, [auth?.user]);


const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		const url = `${process.env.REACT_APP_BASE_URL}/api/profile`;
		const { data:res} = await axios.put(url, data);
		if (res?.error) {
      toast.error(res?.error);
    }
    else {
      setAuth({ ...auth, user: res.updatedUser });
      const ls = localStorage.getItem("auth");
      const pls = JSON.parse(ls);
      pls.user = res.updatedUser;
      localStorage.setItem("auth", JSON.stringify(pls));
      toast.success("Profile Updated Successfully");
    }
		
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="admin" id="admin">
    <NavStudent/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="admin-bx wow zoomIn">
                    <form className={styles.form_container} onSubmit={handleSubmit}>
						<h2>Your Profile</h2>
            <h3>Welcome, {auth?.user?.firstName} </h3>
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
              disabled
						/>
            <input
							type="number"
							placeholder="phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
							required
							className={styles.input}
						/>
            <input
							type="number"
							placeholder="mark10"
							name="mark10"
							onChange={handleChange}
							value={data.mark10}
							required
							className={styles.input}
						/>
            <input
							type="number"
							placeholder="mark12"
							name="mark12"
							onChange={handleChange}
							value={data.mark12}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Update
						</button>

						<HashLink  to='/student'>
                            <button
                              type="button"
                              class="btn btn-outline-danger"
                            >
                             Back
                            </button>
                            </HashLink>
					</form>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

export default Profile