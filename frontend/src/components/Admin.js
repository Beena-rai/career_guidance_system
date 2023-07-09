
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import { useAuth } from "../context/authContext";
import AdminMenu from "./AdminMenu";

const Admin = () => {
    const [auth] = useAuth();
    return (
        <section className="admin" id="admin">
            <NavAll />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="admin-bx wow zoomIn">
                            <h2>Admin Panel</h2>
                            <h3> Welcome,{auth?.user?.firstName}</h3>
                            <AdminMenu />
                        </div>
                    </div>
                </div>
            </div>
            <img className="background-image-left" src={colorSharp} alt="Image" />
        </section>
    )
}

export default Admin