import React, { useEffect } from "react";
import "./Sidebar.css";
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
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: actionTypes.SET_PLAYLISTS, playlists });
    };
    getPlayListUserData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (playlistById) => {
    dispatch({ type: actionTypes.SET_PLAYLIST_ID, playlistById });
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <img
          className="sidebar-logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="Spotify"
        />
        <div className="sidebar-list">
          <div className="sidebarOption">
            <HomeOutlinedIcon className="sidebarOption-icon" />
            <h4>Home</h4>
          </div>
          <div className="sidebarOption">
            <SearchRoundedIcon className="sidebarOption-icon" />
            <h4>Search</h4>
          </div>
          <div className="sidebarOption">
            <LibraryMusicOutlinedIcon className="sidebarOption-icon" />
            <h4>Your Library</h4>
          </div>
        </div>

        <div className="sidebar-list">
          <div className="sidebarOption">
            <AddBoxIcon className="sidebarOption-icon" />
            <h4>Create Playlist</h4>
          </div>
          <div className="sidebarOption">
            <FavoriteIcon className="sidebarOption-icon" />
            <h4>Liked Songs</h4>
          </div>
        </div>
        <hr />
        <div className="sidebar-list sidebar-playlists">
          {playlists.map(({ name, id }) => {
            return (
              <div
                className="sidebarOption"
                key={id}
                onClick={() => changeCurrentPlaylist(id)}
              >
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
