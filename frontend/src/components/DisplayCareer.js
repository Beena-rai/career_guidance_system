
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAdmin } from './NavAdmin';
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const DisplayCareer = () => {
  const navigate = useNavigate();
  const [career, setCareer] = useState([]);
  const getAllCareer = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/career/getcareer`);
      if (data?.success) {
        setCareer(data?.careers);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  useEffect(() => {
    getAllCareer();
  }, []);

  return (
    <section className="admin" id="admin">
      <NavAdmin />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <h1 className="text-center" style={{ textDecoration: 'underline white' }}>Careers</h1>
              <div class="d-flex align-items-end flex-column"><HashLink to='/adminPanel'>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Back
                </button>
              </HashLink></div>
              <div className="col-md-15">
                <div className="d-flex flex-wrap">
                  <div className="d-flex flex-wrap">
                    {career?.map((p) => (
                      <div className="card m-5" style={{ width: "12rem", height: "15rem" }}>
                        <Link
                          key={p._id}
                          to={`/adminPanel/displaycareer/${p.name}`}
                          className="detail-link"
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/career/careerphoto/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                           
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
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

export default DisplayCareer