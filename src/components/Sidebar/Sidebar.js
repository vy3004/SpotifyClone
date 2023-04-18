import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption/SidebarOption";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { actionTypes } from "../../utils/Constant";

export default function Sidebar() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlayListUserData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      console.log(response);
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      console.log("LIST==", playlists);
      dispatch({ type: actionTypes.SET_PLAYLISTS, playlists });
    };
    getPlayListUserData();
  }, [token, dispatch]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <img
          className="sidebar-logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="Spotify"
        />
        <div className="sidebar-list">
          <SidebarOption Icon={HomeOutlinedIcon} option="Home" />
          <SidebarOption Icon={SearchRoundedIcon} option="Search" />
          <SidebarOption
            Icon={LibraryMusicOutlinedIcon}
            option="Your Library"
          />
        </div>

        <div className="sidebar-list">
          <SidebarOption Icon={AddBoxIcon} option="Create Playlist" />
          <SidebarOption Icon={FavoriteIcon} option="Liked Songs" />
        </div>
        <hr />
        <div className="sidebar-list">
          {playlists.map(({ name, id }) => {
            return <SidebarOption key={id} option={name} />;
          })}
        </div>
      </div>
    </div>
  );
}
