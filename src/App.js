import React, { useState, useEffect } from "react";
import SignInSignUp from "./page/SignInSignUp";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogerUp } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogerUp());
    setRefreshCheckLogin(false);
    setLoadUser(true)
    console.log("aca es efect set user");
  }, [refreshCheckLogin]);

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? <Routing setRefreshCheckLogin={setRefreshCheckLogin}/> : <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin}/>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
