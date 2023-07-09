import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../styles/Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const url = `${process.env.REACT_APP_BASE_URL}/api/student`;
            const res = await axios.get(url);
            if (res.data.ok) {
                setOk(true);
            } 
            else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}