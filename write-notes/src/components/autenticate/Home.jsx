import React from 'react';
import buscar  from '../../assets/buscar.png';
import write from '../../assets/write.jpeg'
import { auth, provider } from '../../lib/firebase';
import { loginWithGoogle } from '../../lib/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Feed/Footer';

export function Home() {
  const navigate = useNavigate();

  const loginGoogle = () =>{
    loginWithGoogle(auth, provider, navigate);
  }

    return (
    
    <div>
        <div className='container'>
          <img id='note' src = { write } alt="Note" />
        </div>

        <button className='btnGoogle' onClick= { loginGoogle } > LOGIN WITH GOOGLE
        <img src= { buscar } className="google" alt="Google"/>
        </button>

      <Footer></Footer>
    </div>
  )
  
}

export default Home