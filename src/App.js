
import './App.css';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useState } from 'react';
import Pattern from './Pattern';





function App() {
  const[isLoggedIn,setisLoggedIn]=useState(false);
  const[name,setName]= useState("");
  const[fname,setFname]= useState("");
  const[email,setEmail]=useState("");
  const[profile,setProfile]=useState("");
  const login = useGoogleLogin({
    onSuccess: async (response)=>{
      try{
        const res= await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers:{
            Authorization:`Bearer ${response.access_token}`,
          },
        });
        console.log(res);
        setName(res.data.family_name);
        setEmail(res.data.email);
        setProfile(res.data.picture);
        setFname(res.data.given_name);
        setisLoggedIn(true);
        

        
        console.log(res);
      } catch(err)
      {
        console.log(err);
      }
    }
  });

  const handleLogout = async () => {

    try {

      const res = await googleLogout({
        onSuccess: () => {
          setisLoggedIn(false);
          setName("");
          setEmail("");
          setProfile("");
          setFname("");
          window.location('/');
        },

      });

    } catch (err) {

      console.log(err);

    }

 };

  return (

    <div className='flex flex-col text-center align-center bg-slate-500 mx-5 my-10 p-5 shadow-lg rounded-md'>
    {isLoggedIn ? (
      // Render user information if logged in
      <div className='my-5'>
        <img className="rounded-full text-center" src={profile} alt="User profile" />
        <h1 className='mx-5'>Hello {fname} {name} <button className="bg-gray-200  rounded-md" onClick={() => handleLogout()}> Signout</button></h1>
        <h1>Your Are signed in with the {email}</h1>
        <Pattern />
      </div>
    ) : (
      // Render login button if not logged in
      <div className='w-50 h-50 align-center justify-center align-center bg-slate-1000'>
        <button className="bg-gray-200 p-4 m-4 rounded-md" onClick={() => login()}>
          Sign in with Google 🚀{' '}
        </button>
      </div>
    )}
  </div>
  )
}

export default App;
