import React from "react";
import colorSharp from "../assets/img/color-sharp.png"
import { useAdd } from "../context/addContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { NavAll} from './NavAll';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const ApproveCollege = () => {
  const [auth, setAuth] = useAuth();
  const [add, setAdd] = useAdd();
  const navigate = useNavigate();

  //detele item
  const removeCollege = (pid) => {
    try {
      let admincollege = [...add];
      let index = admincollege.findIndex((item) => item._id === pid);
      admincollege.splice(index, 1);
      setAdd(admincollege);
      localStorage.setItem("add", JSON.stringify(admincollege));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="admin" id="admin">
    <NavAll/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="admin-bx wow zoomIn">
                    <h1 className="text-center" style={{ textDecoration: 'underline white' }}>List of Approved Colleges</h1>
                    <div class="d-flex align-items-end flex-column"><HashLink  to='/adminPanel/admincollege'>
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
            {add?.map((p) => (
               
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
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    
                    </div>
                    </Link>
                    <div className="card-body">
                    <button
                    className="btn btn-danger"
                    onClick={() => removeCollege(p._id)}
                  >
                    Remove
                  </button>
                  
                </div>
                </div>
              
            ))}
            </div>
          </div></div>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

export default ApproveCollege