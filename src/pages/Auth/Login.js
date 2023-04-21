import React from "react";
import "./Login.css";
import { accessUrl } from "../../config/config";

export default function Login() {
  return (
    <div className="login">
      <img
        className="login-logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify"
      />

      <button
        onClick={() => {
          window.location.href = accessUrl;
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
