import React from "react";
import "./Volume.css";
import { Slider } from "@mui/material";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="volume-container">
      <LyricsRoundedIcon />
      <QueueMusicRoundedIcon />
      <DevicesRoundedIcon />
      <VolumeUpRoundedIcon />
      <Slider
        className="player-control-slider volume-slider"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
      />
    </div>
  );
}
