import React from "react";

import "./View.css";

const View = () => {

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>ACTIONS YOU CAN PERFORM</p>
        </div>
        <div className="container">
          
          <a href="https://fyp2middefensevisualizer.web.app/">
            <button className="bttn btn-inf">Edf Visualizer</button>
            </a>
         
            <a href="#">
            <button className="bttn btn-visualize">Generate Inference</button>
            </a>
          
        </div>
      </div>
    </div>
  );
};

export default View;
