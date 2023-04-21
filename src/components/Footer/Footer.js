import React from "react";
import "./Footer.css";
import CurrentTrack from "../CurrentTrack/CurrentTrack";
import PlayerControl from "../PlayerControl/PlayerControl";
import Volume from "../Volume/Volume";
import { useStateProvider } from "../../utils/StateProvider";

export default function Footer() {
  const [{ currentPlaying }] = useStateProvider();
  const audio = new Audio(currentPlaying && currentPlaying.preview_url);

  return (
    <div className="footer-container">
      <CurrentTrack />
      <PlayerControl audio={audio} />
      <Volume />
    </div>
  );
}
