import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChats.css";

function SidebarChats({ addNewChat, id, name }) {
  /*-------state---------*/
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");

  //effects function
  useEffect(() => {
    if (id) {
      db.collection("groups")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  //button click handler
  const clickHandler = () => {
    const roomName = prompt("please Enter group name");
    if (roomName) {
      db.collection("groups").add({
        name: roomName,
      });
    }
  };
  //return with advanced if else method
  return !addNewChat ? (
    <Link to={`/groups/${id}`}>
      <div className="sidebarChats">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="sidebachat -info">
          <h3>{name}</h3>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={clickHandler} className="sidebarChats">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChats;
