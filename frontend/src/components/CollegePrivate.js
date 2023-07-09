import { useState, useEffect } from "react";
import { useCollegeAuth } from "../context/collegeauthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../styles/Spinner";

export default function CollegePrivate() {
    const [ok, setOk] = useState(false);
    const [collegeAuth, setCollegeAuth] = useCollegeAuth();

    useEffect(() => {
        const collegeAuthCheck = async () => {
            const url = `${process.env.REACT_APP_BASE_URL}/api/college`;
            const res = await axios.get(url);
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        };
        if (collegeAuth?.token) collegeAuthCheck();
    }, [collegeAuth?.token]);
    return ok ? <Outlet /> : <Spinner />;
}