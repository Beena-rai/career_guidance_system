import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { NavAll} from './NavAll';
import { HashLink } from 'react-router-hash-link';

const CareerDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState({});
  const [relatedCareers, setRelatedCareers] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.name) getCareer();
  }, [params?.name]);

  //getCareer
  const getCareer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/career/getcareer/${params.name}`
      );
      setCareer(data?.career);
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
              <h1 className="text-center ">{career.name}</h1>
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
                    src={`${process.env.REACT_APP_BASE_URL}/api/career/careerphoto/${career._id}`}
                    className="card-img-top"
                    alt={career.name}
                    height="200"
                    width={"250px"}
                  />
                </div>
                <div className="col-md-6 ">
                  <h2 style={{textDecoration: 'underline white' }}>Description</h2>
                  <p style={{fontSize: 18}}>{career.description}</p>
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


export default CareerDetails;