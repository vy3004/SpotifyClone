export const apiUri = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

const clientId = "f23311bc80c44b5181f191e2d4e1c3c0";

const scope = [
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-playback-position",
  "user-modify-playback-state",
  "user-top-read",
];

export const accessUrl = `${apiUri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
  " "
)}&response_type=token&show_dialog=true`;
