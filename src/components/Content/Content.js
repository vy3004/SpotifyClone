import React from "react";
import Navbar from "../Navbar/Navbar";
import Playlist from "../Playlist/Playlist";
import "./Content.css";

export default function Content() {
  return (
    <div className="content-container">
      <Navbar />
      <Playlist />
    </div>
  );
}
