import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import { useStateProvider } from "./utils/StateProvider";
import { actionTypes } from "./utils/Constant";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: actionTypes.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return <div>{token ? <Home /> : <Login />}</div>;
}

export default App;
