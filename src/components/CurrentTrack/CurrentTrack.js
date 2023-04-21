import React, { useEffect } from "react";
import "./CurrentTrack.css";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { actionTypes } from "../../utils/Constant";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PictureInPictureAltRoundedIcon from "@mui/icons-material/PictureInPictureAltRounded";
import { Skeleton } from "@mui/material";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
          is_playing: response.data.is_playing,
          duration_ms: response.data.item.duration_ms,
          progress_ms: response.data.progress_ms,
          preview_url: response.data.item.preview_url,
        };
        console.log(response);
        console.log("data", currentPlaying);
        dispatch({ type: actionTypes.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: actionTypes.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return currentPlaying ? (
    <div className="current-track-container">
      <div className="current-track-img">
        <img src={currentPlaying.image} alt="currentPlayingImage" />
      </div>
      <div className="current-track-content">
        <b>{currentPlaying.name}</b>
        <p>{currentPlaying.artists.join(", ")}</p>
      </div>
      <div className="current-track-btn">
        <FavoriteBorderRoundedIcon />
        <PictureInPictureAltRoundedIcon />
      </div>
    </div>
  ) : (
    <div className="current-track-container">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={65}
        height="100%"
      />
      <div className="current-track-content">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.5rem" }}
          animation="wave"
          width={160}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          animation="wave"
          width={60}
        />
      </div>
      <div className="current-track-btn">
        <FavoriteBorderRoundedIcon />
        <PictureInPictureAltRoundedIcon />
      </div>
    </div>
  );
}
