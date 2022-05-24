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
    <>
      <div>
          <header className="title">
          <h1> WRITE NOTES </h1>
          <img className="btnLogout" src={logoutImg} alt="Exit" onClick={signOut} />
        </header>


        <section>
          <NewNotes />
        </section>


        <Footer />
      </div>
    </>
  );
}
export default Timeline;
