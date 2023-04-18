export const apiUri = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

const clientId = "f51c1096ba5e4079b8ac2dced7005b25";

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
