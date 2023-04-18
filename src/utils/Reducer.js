import { actionTypes } from "./Constant";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
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
    default:
      return state;
  }
};

export default reducer;
