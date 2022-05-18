import React from "react";
import logoutImg from "../../assets/logoutImg.png";
import { logOut } from "../../lib/firebaseAuth";
import { useNavigate } from "react-router-dom";
import Footer from '../Feed/Footer';
import NewNotes from "../Feed/NewNotes";


export function Timeline() {
  const navigate = useNavigate();

  const signOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="container">
      <header className="title">
        <h1> WRITE NOTES </h1>
        <button className="btnLogout" onClick={signOut}>
          <img src={logoutImg} className="exit" alt="Exit" />
        </button>
      </header>

      <NewNotes></NewNotes>
      <Footer></Footer>
      
    </div>
  );
}
export default Timeline;