
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';
import { NavAdmin } from './NavAdmin';
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAdd } from "../context/addContext";
import { HashLink } from 'react-router-hash-link';

const AdminCollege = () => {
  const navigate = useNavigate();
  const [college, setCollege] = useState([]);
  const [add, setAdd] = useAdd([]);


  const getAllcollege = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/college/getcollege`);
      if (data?.success) {
        setCollege(data?.colleges);

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting college");
    }
  };

  useEffect(() => {
    getAllcollege();
  }, []);


  return (
    <section className="admin" id="admin">
      <NavAdmin />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-bx wow zoomIn">
              <h1 className="text-center" style={{ textDecoration: 'underline white' }}>List of Colleges</h1>

              <HashLink to={"/adminPanel/admincollege/approvecollege"}><button
                className="btn btn-primary mt-10 mb-10"
              >
                View {add?.length} approved colleges
              </button></HashLink>
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
                    {college?.map((p) => (
                      <div className="card m-5" style={{ width: "12rem", height: "13rem" }} >
                        <Link
                          key={p._id}
                          to={`/adminPanel/admincollege/admincollegedetails/${p.name}`}
                          className="detail-link"
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/api/college/collegephoto/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                          <div className="card-body" >
                            <h6 className="card-title">{p.name}</h6>
                            
                          </div>
                        </Link>
                        <div className="card-body">

                          <button
                            className="btn btn-success"
                            onClick={() => {
                              if (add?.length === 0) {
                                setAdd([...add, p]);
                                localStorage.setItem(
                                  "add",
                                  JSON.stringify([...add, p])
                                );
                                toast.success("College added by admin");
                              }
                              else {
                                const ls = localStorage.getItem("add");
                                const pls = JSON.parse(ls);
                                let j;
                                for (let i = 0; i < add.length; i++) {
                                  if (pls[i]._id === p._id) {
                                    j = 5;
                                  }
                                }
                                if (j === 5) {
                                  toast.error("College already added by admin");
                                }
                                else {
                                  setAdd([...add, p]);
                                  localStorage.setItem(
                                    "add",
                                    JSON.stringify([...add, p])
                                  );
                                  toast.success("College added by admin");
                                }
                              }
                            }}

                          >
                            ADD
                          </button>
                        </div>
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

export default AdminCollege