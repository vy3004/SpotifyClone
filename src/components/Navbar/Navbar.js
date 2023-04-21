import React from "react";
import "./Navbar.css";
import { useStateProvider } from "../../utils/StateProvider";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function Navbar({ navBackground, backgroundColor }) {
  const [{ userInfo }] = useStateProvider();

  return (
    <div
      className="navbar-container"
      style={
        navBackground ? { background: backgroundColor } : { background: "none" }
      }
    >
      <div className="navbar-left">
        <IconButton className="navbar-btn-back" title="Go back">
          <ArrowBackIosNewRoundedIcon style={{ color: "white" }} />
        </IconButton>
        <div className="navbar-search">
          <SearchRoundedIcon />
          <input type="search" placeholder="What do you want to listen to?" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-user" title={userInfo?.userName}>
          <Avatar
            style={{ background: "#535353" }}
            sx={{ height: "28px", width: "28px" }}
          >
            <PermIdentityIcon />
          </Avatar>
          <p>{userInfo?.userName}</p>
          <ArrowDropDownOutlinedIcon style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
}
