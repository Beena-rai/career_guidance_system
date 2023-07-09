import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { NavAll } from './NavAll';
import { HashLink } from 'react-router-hash-link';

const DisplayCollegeDetails = () => {
  const params = useParams();
  const [college, setCollege] = useState({});

  useEffect(() => {
    if (params?.name) getcollege();
  }, [params?.name]);

  const getcollege = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/college/getcollege/${params.name}`
      );
      setCollege(data?.college);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="admin" id="admin">
      <NavAll />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <h1 className="text-center ">{college.name}</h1>
              <p className="text-center mb-8">{college.region}</p>
              <div class="d-flex align-items-end flex-column"><HashLink to='/'>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Back
                </button>
              </HashLink></div>
              <div className="row container mt-8">
                <div className="col-md-6">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${college._id}`}
                    className="card-img-top"
                    alt={college.name}
                    height="300"
                    width={"350px"}
                  />
                  <h4 className="text-left mt-10 " style={{ textDecoration: 'underline white' }}>Eligibility</h4>
                  <p className="text-left">{college.eligibility}</p>

                  <h4 className="text-left mt-10 " style={{ textDecoration: 'underline white' }}>Country</h4>
                  <p className="text-left">{college.country}</p>

                  <h4 className="text-left mt-10 " style={{ textDecoration: 'underline white' }}>Fee</h4>
                  <p className="text-left">INR {college.fee}</p>
                </div>
                <div className="col-md-6 ">
                  <h4 style={{ textDecoration: 'underline white' }}>Description</h4>
                  <p>{college.description}</p>
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


export default DisplayCollegeDetails;