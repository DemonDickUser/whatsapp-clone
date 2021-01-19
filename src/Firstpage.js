import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./firstpage.css";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";

function Firstpage() {
  //from state provider---*createed-my-state-

  const [{}, dispatch] = useStateValue();

  //provoke google authentication on click event
  const ClickHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-Container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/300px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login-text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={ClickHandler}> Sign in with google </Button>
      </div>
    </div>
  );
}

export default Firstpage;
