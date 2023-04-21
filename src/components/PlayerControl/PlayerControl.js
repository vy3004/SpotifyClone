import React from "react";
import "./PlayerControl.css";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import { IconButton, Slider } from "@mui/material";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { actionTypes } from "../../utils/Constant";
import moment from "moment";

export default function PlayerControl({ audio }) {
  const [{ token, trackState, currentPlaying }, dispatch] = useStateProvider();
  console.log("Play", currentPlaying);
  let test = new Audio(currentPlaying && currentPlaying.preview_url);

  const changeState = () => {
    console.log("AUDIO", audio);
    dispatch({
      type: actionTypes.SET_TRACK_STATE,
      trackState: !trackState,
    });
  };

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: actionTypes.SET_PLAYER_STATE, playerState: true });
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      console.log("currentPlaying", response1.data);
      dispatch({ type: actionTypes.SET_PLAYING, currentPlaying });
    } else {
      dispatch({ type: actionTypes.SET_PLAYING, currentPlaying: null });
    }
  };

  const progress = currentPlaying
    ? moment(currentPlaying.progress_ms).format("m:ss")
    : "-:-";

  const duration = currentPlaying
    ? moment(currentPlaying.duration_ms).format("m:ss")
    : "-:-";

  return (
    <div className="player-control-container">
      <div className="player-control-top">
        <ShuffleRoundedIcon
          titleAccess="Enable shuffle"
          onClick={() => audio.play()}
        />
        <SkipPreviousRoundedIcon
          sx={{ fontSize: "2rem" }}
          titleAccess="Previous"
          onClick={() => changeTrack("previous")}
        />
        <IconButton onClick={changeState}>
          {!trackState ? (
            <PlayCircleRoundedIcon
              titleAccess="Play"
              onClick={() => audio.play()}
            />
          ) : (
            <PauseCircleRoundedIcon
              titleAccess="Pause"
              onClick={() => audio.pause()}
            />
          )}
        </IconButton>
        <SkipNextRoundedIcon
          sx={{ fontSize: "2rem" }}
          titleAccess="Next"
          onClick={() => changeTrack("next")}
        />
        <RepeatRoundedIcon
          titleAccess="Enable repeat"
          onClick={() => audio.pause()}
        />
        {/* <iframe
          title="music"
          src={currentPlaying && currentPlaying.preview_url}
          allow="autoplay"
        ></iframe>
        <audio
          autoplay
          controls
          src={currentPlaying && currentPlaying.preview_url}
        /> */}
      </div>
      <div className="player-control-bottom">
        <p>{progress}</p>
        <Slider
          className="player-control-slider"
          value={currentPlaying && currentPlaying.progress_ms}
          max={currentPlaying && currentPlaying.duration_ms}
        />
        <p>{duration}</p>
      </div>
    </div>
  );
}
