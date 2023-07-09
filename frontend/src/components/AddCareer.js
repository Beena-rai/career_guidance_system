
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCareer = () => {
    const navigate = useNavigate();
    const [career, setCareer] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
  
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const careerData = new FormData();
        careerData.append("name", name);
        careerData.append("description", description);
        careerData.append("photo", photo);
        console.log(careerData.name);
        const { data } = axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/career/addcareer`,
          careerData
        );
        console.log(data?.data.message);
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Career Created Successfully");
          navigate("/adminPanel");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
  

  return (
    <section className="admin" id="admin">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="admin-bx wow zoomIn">
                    <div className="col-md-9">
            <h1>Create Career</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE CAREER
                </button>
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

export default CreateCareer