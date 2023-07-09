
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const CollegeDetails = () => {
  const params = useParams();
  const [name, setName] = useState("");
 
  const [id, setId] = useState("");


  const getSinglecollege = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/college/getcollege/${params.name}`
      );
      setName(data.college.name);
      setId(data.college._id);
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSinglecollege();
    //eslint-disable-next-line
  }, []);


  return (
    <section className="admin" id="admin">
      <NavAll />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <h1 className="text-center">Colleges</h1>
              <div class="d-flex align-items-end flex-column"><HashLink to='/'>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Back
                </button>
              </HashLink></div>
              <div className="col-md-9 " >
                <div className="d-flex" >
                  <Link
                    key={id}
                    to={`/collegedetails/update/${name}`}
                    className="detail-link"
                  >
                    <div className="card m-2 mt-4" style={{ width: "12rem", height: "14rem" }}>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${id}`}
                        className="card-img-top"
                        alt={name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

export default CollegeDetails