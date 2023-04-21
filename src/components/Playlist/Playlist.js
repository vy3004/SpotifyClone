import React, { useEffect } from "react";
import "./Playlist.css";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { actionTypes } from "../../utils/Constant";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { IconButton } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ExplicitRoundedIcon from "@mui/icons-material/ExplicitRounded";
import moment from "moment";

export default function Playlist({ headerTableBackground }) {
  const [
    { token, playlistById, playlistInfo, userInfo, currentPlaying },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const { data } = await axios.get(
        `
      https://api.spotify.com/v1/playlists/${playlistById}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const playlistInfo = {
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.images[0].url,
        tracks: data.tracks.items.map(({ track, added_at }) => ({
          id: track.id,
          name: track.name,
          image: track.album.images[2].url,
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
          added_at: added_at,
        })),
      };
      dispatch({ type: actionTypes.SET_PLAYLIST, playlistInfo });
    };
    getInitialPlaylist();
  }, [token, playlistById, dispatch]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: actionTypes.SET_PLAYING, currentPlaying });
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    return moment(ms).format("mm:ss");
  };

  const msToHours = (ms) => {
    return moment(ms).format("h") - 8 === 0
      ? moment(ms).format("mm") + " min " + moment(ms).format("s") + " sec"
      : moment(ms).format("h") -
          8 +
          " hr " +
          moment(ms).format("mm") +
          " min " +
          moment(ms).format("s") +
          " sec";
  };

  const formatTimeAgo = (time) => {
    return moment(time).startOf("seconds").fromNow();
  };

  return (
    playlistInfo && (
      <div className="playlist-container">
        <div className="playlist-top">
          <div className="playlist-info">
            <div className="playlist-image">
              <img src={playlistInfo.image} alt="playlistImage" />
            </div>
            <div className="playlist-detail">
              <b>Playlist</b>
              <h1>{playlistInfo.name}</h1>
              <p className="blur">{playlistInfo.description}</p>
              <div className="detail-text">
                <b>
                  {userInfo.userName} • {playlistInfo.tracks.length} songs,
                </b>
                <span className="blur">
                  {" "}
                  {msToHours(
                    playlistInfo.tracks.reduce((accumulator, track) => {
                      return accumulator + track.duration;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="playlist-tracks">
          <div className="btn">
            <IconButton className="btn-play">
              {currentPlaying && !currentPlaying.is_playing ? (
                <PlayCircleRoundedIcon titleAccess="Play" />
              ) : (
                <PauseCircleRoundedIcon titleAccess="Pause" />
              )}
            </IconButton>
            <MoreHorizRoundedIcon
              className="blur"
              style={{ color: "white" }}
              fontSize="large"
              titleAccess="More options"
            />
          </div>

          <div className="table">
            <div
              className={
                headerTableBackground
                  ? "table-header change-color-hd"
                  : "table-header"
              }
            >
              <div className="col-1">#</div>
              <div className="col-2">Title</div>
              <div className="col-3">Album</div>
              <div className="col-4">Date added</div>
              <div className="col-5">
                <AccessTimeRoundedIcon className="blur" />
              </div>
            </div>
            <div className="table-body">
              {playlistInfo.tracks.map(
                (
                  {
                    id,
                    name,
                    image,
                    artists,
                    duration,
                    album,
                    added_at,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={index}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col-1">
                        <p>{index + 1}</p>
                      </div>
                      <div className="col-2 title-track">
                        <div className="img">
                          <img src={image} alt="trackImage" />
                        </div>
                        <div className="text">
                          <b> {name}</b>
                          <div className="artist">
                            <ExplicitRoundedIcon fontSize="small" />{" "}
                            {artists.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <p>{album}</p>
                      </div>
                      <div className="col-4">
                        <p>{formatTimeAgo(added_at)}</p>
                      </div>
                      <div className="col-5">
                        <p>{msToMinutesAndSeconds(duration)}</p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
