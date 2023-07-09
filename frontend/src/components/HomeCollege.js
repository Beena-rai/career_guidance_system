import React from "react";
import colorSharp from "../assets/img/color-sharp.png"
import { useAdd } from "../context/addContext";
import { useAuth } from "../context/authContext";
import { useSelect } from "../context/selectContext";
import { useNavigate } from "react-router-dom";
import { NavAll } from './NavAll';
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio, Select } from "antd";
import { Fees, Ranks } from "./FeeRank";
import { HashLink } from 'react-router-hash-link';


const HomeCollege = () => {
  const { Option } = Select;
  const [auth, setAuth] = useAuth();
  const [add, setAdd] = useAdd();
  const navigate = useNavigate();
  const [select, setSelect] = useSelect([]);
  const [college, setCollege] = useState([]);
  const [radiof, setRadiof] = useState([]);
  const [radior, setRadior] = useState([]);
  const [region, setRegion] = useState([]);
  const [country, setCountry] = useState([]);


  const filterCollege = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/college/college-filters`, {
        radior,
        radiof, region, country
      });
      setAdd(data?.colleges);
      console.log(data?.colleges);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (radiof.length || radior.length || region.length || country.length) filterCollege();
  }, [radior, radiof, region, country]);


  return (
    <section className="admin" id="admin">
      <NavAll />
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h6 className="text-center mt-6">Select Region</h6>
          <div className="d-flex flex-column">
            <select onChange={(e) => setRegion(e.target.value)} placeholder="Select Region" name="" id="" className='form-control'>
              <option disabled={true} value="">-Choose and option--</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="">All</option>
            </select>
          </div>
          <h6 className="text-center mt-6">Select Country</h6>
          <div className="d-flex flex-column">
            <select onChange={(e) => setCountry(e.target.value)} name="" id="" className='form-control'>
              <option disabled={true} value="">-Choose and option--</option>
              <option value="Abroad">Abroad</option>
              <option value="India">India</option>
              <option value="">All</option>
            </select>
          </div>
          <h6 className="text-center mt-6">Fees Range</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadiof(e.target.value)}>
              {Fees?.map((p) => (
                <div key={p._id}>
                  <Radio style={{ color: "blue" }} value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <h6 className="text-center mt-6">Ranking</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadior(e.target.value)}>
              {Ranks?.map((p) => (
                <div key={p._id}>
                  <Radio style={{ color: "blue" }} value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-6"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ textDecoration: 'underline white' }}>List Of Colleges</h1>
          <div class="d-flex align-items-end flex-column"><HashLink to='/'>
            <button
              type="button"
              class="btn btn-outline-danger"
            >
              Back
            </button>
          </HashLink></div>
          <div className="d-flex flex-wrap">
            {auth.user ? (
              <div className="d-flex flex-wrap">
                {add?.map((p) => (
                  <div className="card m-5" style={{ width: "12rem", height: "13rem" }}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      
                      <button
                        className="btn btn-secondary ms-3"
                        onClick={() => {
                          if (select?.length === 0) {
                            setSelect([...select, p]);
                            localStorage.setItem(
                              "select",
                              JSON.stringify([...select, p])
                            );
                            toast.success("College is selected");
                          }
                          else {
                            const ls = localStorage.getItem("select");
                            const pls = JSON.parse(ls);
                            let j;
                            for (let i = 0; i < select.length; i++) {
                              if (pls[i]._id === p._id) {
                                j = 5;
                              }
                            }
                            if (j === 5) {
                              toast.error("You have already selected this college");
                            }
                            else {
                              setSelect([...select, p]);
                              localStorage.setItem(
                                "select",
                                JSON.stringify([...select, p])
                              );
                              toast.success("College is selected");
                            }
                          }
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>) : (
              <div className="d-flex flex-wrap">
                {add?.map((p) => (
                  <div className="card m-5" style={{ width: "12rem", height: "13rem" }}>
                    <Link
                      key={p._id}
                      to={`/displaycollegedetails/${p.name}`}
                      className="detail-link"
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${p._id}`}
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
            )}
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

export default HomeCollege







