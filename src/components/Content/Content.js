import React, { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Playlist from "../Playlist/Playlist";
import "./Content.css";
import { useStateProvider } from "../../utils/StateProvider";
import Color from "color-thief-react";

export default function Content() {
  const [{ playlistInfo }] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerTableBackground, setHeaderTableBackground] = useState(false);
  const bodyRef = useRef();

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 300
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 400
      ? setHeaderTableBackground(true)
      : setHeaderTableBackground(false);
  };

  return playlistInfo && playlistInfo.image ? (
    <Color src={playlistInfo.image} crossOrigin="anonymous" format="hex">
      {({ data }) => {
        return (
          <div
            className="content-container"
            ref={bodyRef}
            onScroll={bodyScrolled}
            style={{ background: data }}
          >
            <Navbar navBackground={navBackground} backgroundColor={data} />
            <Playlist headerTableBackground={headerTableBackground} />
          </div>
        );
      }}
    </Color>
  ) : (
    <div
      className="content-container color-default"
      ref={bodyRef}
      onScroll={bodyScrolled}
    >
      <Navbar navBackground={navBackground} />
      <Playlist headerTableBackground={headerTableBackground} />
    </div>
  );
}
