import React, { useEffect } from "react";
import Body from "../../components/Body/Body";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { actionTypes } from "../../utils/Constant";

export default function Home() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userUrl: data.external_urls.spotify,
      };
      dispatch({ type: actionTypes.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  return (
    <div className="home-container">
      <Body />
      <Footer />
    </div>
  );
}
