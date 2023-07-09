
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { useCollegeAuth } from "../context/collegeauthContext";
import { HashLink } from 'react-router-hash-link';


const { Option } = Select;
const UpdateCollegeDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [college, setCollege] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [ranking, setRanking] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");


  const [fee, setFee] = useState("");
  const [collegeAuth, setCollegeAuth] = useCollegeAuth();

  const getSinglecollege = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/college/getcollege/${params.name}`
      );
      setName(data.college.name);
      setId(data.college._id);
      setDescription(data.college.description);
      setEligibility(data.college.eligibility);
      setRanking(data.college.ranking);
      setCountry(data.college.country);
      setRegion(data.college.region);
      setFee(data.college.fee);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglecollege();

    //eslint-disable-next-line
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const collegeData = new FormData();
      collegeData.append("name", name);
      collegeData.append("description", description);
      collegeData.append("eligibility", eligibility);
      collegeData.append("ranking", ranking);
      collegeData.append("region", region);
      collegeData.append("country", country);
      collegeData.append("fee", fee);
      photo && collegeData.append("photo", photo);
      const { data } = axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/college/updatecollege/${id}`,
        collegeData
      );
      if (data?.success) {

        toast.error(data?.message);
      } else {
        toast.success("college Updated Successfully");
      }
    }

    catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this  ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/college/deletecollege/${id}`
      );
      toast.success("college DEleted Succfully");
      navigate("/collegedetails");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="admin" id="admin">
      <NavAll />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <h1>College Details</h1>
              <div className="ml-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                <div className="col-md-9 mt-8">
                  <div className="m-1 w-75">
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${id}`}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        value={description}
                        placeholder="write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        value={eligibility}
                        placeholder="write a eligibility"
                        className="form-control"
                        onChange={(e) => setEligibility(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        value={ranking}
                        placeholder="write a Ranking"
                        className="form-control"
                        onChange={(e) => setRanking(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <Select
                        bordered={false}
                        placeholder="Select Region"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                          setRegion(value);
                        }}
                      >
                        <Option value="Andhra Pradesh">Andhra Pradesh</Option >
                        <Option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</Option >
                        <Option value="Arunachal Pradesh">Arunachal Pradesh</Option >
                        <Option value="Assam">Assam</Option >
                        <Option value="Bihar">Bihar</Option >
                        <Option value="Chandigarh">Chandigarh</Option >
                        <Option value="Chhattisgarh">Chhattisgarh</Option >
                        <Option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</Option >
                        <Option value="Daman and Diu">Daman and Diu</Option >
                        <Option value="Delhi">Delhi</Option >
                        <Option value="Lakshadweep">Lakshadweep</Option >
                        <Option value="Puducherry">Puducherry</Option >
                        <Option value="Goa">Goa</Option >
                        <Option value="Gujarat">Gujarat</Option >
                        <Option value="Haryana">Haryana</Option >
                        <Option value="Himachal Pradesh">Himachal Pradesh</Option >
                        <Option value="Jammu and Kashmir">Jammu and Kashmir</Option >
                        <Option value="Jharkhand">Jharkhand</Option >
                        <Option value="Karnataka">Karnataka</Option >
                        <Option value="Kerala">Kerala</Option >
                        <Option value="Madhya Pradesh">Madhya Pradesh</Option >
                        <Option value="Maharashtra">Maharashtra</Option >
                        <Option value="Manipur">Manipur</Option >
                        <Option value="Meghalaya">Meghalaya</Option >
                        <Option value="Mizoram">Mizoram</Option >
                        <Option value="Nagaland">Nagaland</Option >
                        <Option value="Odisha">Odisha</Option >
                        <Option value="Punjab">Punjab</Option >
                        <Option value="Rajasthan">Rajasthan</Option >
                        <Option value="Sikkim">Sikkim</Option >
                        <Option value="Tamil Nadu">Tamil Nadu</Option >
                        <Option value="Telangana">Telangana</Option >
                        <Option value="Tripura">Tripura</Option >
                        <Option value="Uttar Pradesh">Uttar Pradesh</Option >
                        <Option value="Uttarakhand">Uttarakhand</Option >
                        <Option value="West Bengal">West Bengal</Option >

                      </Select>
                    </div>
                    <div className="mb-3">
                      <Select
                        bordered={false}
                        placeholder="Select country "
                        size="large"
                        showSearch

                        className="form-select mb-3"
                        onChange={(value) => {
                          setCountry(value);
                        }}

                      >
                        <Option value="India">India</Option>
                        <Option value="Abroad">Abroad</Option>
                      </Select>
                    </div>

                    <div className="mb-3">
                      <input
                        type="number"
                        value={fee}
                        placeholder="write a fee"
                        className="form-control"
                        onChange={(e) => setFee(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button className="btn btn-success gap-9" onClick={handleUpdate}>
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                      </button>

                    </div>

                    <div className="mt-4 mb-3">
                      <HashLink to={`/collegedetails/${params.name}`}>
                        <button
                          type="button"
                          class="btn btn-outline-danger"

                        >
                          Back
                        </button>
                      </HashLink>
                    </div>
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

export default UpdateCollegeDetails