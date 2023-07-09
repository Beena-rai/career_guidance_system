
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAll } from './NavAll';
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const UpdateCareer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [career, setCareer] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleCareer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/career/getcareer/${params.name}`
      );
      setName(data.career.name);
      setId(data.career._id);
      setDescription(data.career.description);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleCareer();
    //eslint-disable-next-line
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const careerData = new FormData();
      careerData.append("name", name);
      careerData.append("description", description);
      photo && careerData.append("photo", photo);
      const { data } = axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/career/updatecareer/${id}`,
        careerData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("career Updated Successfully");
        navigate("/adminPanel");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this  ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/career/deletecareer/${id}`
      );
      toast.success("career DEleted Succfully");
      navigate("/adminPanel");
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
              <div className="col-md-9">
                <h1>Update Product</h1>
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
                          src={`${process.env.REACT_APP_BASE_URL}/api/career/careerphoto/${id}`}
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
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

export default UpdateCareer