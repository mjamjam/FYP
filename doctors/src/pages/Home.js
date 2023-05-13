import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db as firebaseDB } from "../firebase";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    firebaseDB.child("patients").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      firebaseDB.child(`patients/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Patient Deleted Successfully");
        }
      });
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Age</th>
            <th style={{ textAlign: "center" }}>Gender</th>
            <th style={{ textAlign: "center" }}>Abnormality</th>
            <th style={{ textAlign: "center" }}>Past Hiistory</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].contact}</td>
                <td>{data[id].age}</td>
                <td>{data[id].gender}</td>
                <td>{data[id].abnormality}</td>
                <td>{data[id].pastHistory}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="bttn btn-edit">Edit</button>
                  </Link>
                  <Link to={`/view/${id}`}>
                    <button className="bttn btn-view">View</button>
                  </Link>
                  <button 
                    className="bttn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
