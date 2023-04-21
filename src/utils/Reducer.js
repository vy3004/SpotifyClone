import { actionTypes } from "./Constant";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  playlistInfo: null,
  playlistById: "6VVk9y4t5inAZDQVOLIXUH",
  currentPlaying: null,
  trackState: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case actionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        playlistInfo: action.playlistInfo,
      };
    case actionTypes.SET_PLAYLIST_ID:
      return {
        ...state,
        playlistById: action.playlistById,
      };
    case actionTypes.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case actionTypes.SET_TRACK_STATE:
      return {
        ...state,
        trackState: action.trackState,
      };
    default:
      return state;
  }
};

export default reducer;
