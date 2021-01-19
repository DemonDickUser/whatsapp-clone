import { Avatar, IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState([]);
  const { groupId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (groupId) {
      db.collection("groups")
        .doc(groupId)
        .onSnapshot((snapshot) => setGroupName(snapshot.data().name));

      db.collection("groups")
        .doc(groupId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [groupId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [groupId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("groups").doc(groupId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>

        <div className="chat-headerinfo">
          <h3>{groupName}</h3>

          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p
            className={`chat-message ${
              message.name === user.displayName && "chat-reciver"
            }`}
          >
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="timeStamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a message"
            type="text"
          />

          <button type="submit" onClick={sendMessage}>
            send a message
          </button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default Chat;
