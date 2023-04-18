import React from "react";
import Content from "../Content/Content";
import Sidebar from "../Sidebar/Sidebar";
import "./Body.css";

export default function Body() {
  return (
    <div className="body-container">
      <Sidebar />
      <Content />
    </div>
  );
}
