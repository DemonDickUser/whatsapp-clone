import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChats from "./SidebarChats";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function SideBar() {
  //state declaration and initialization
  const [groups, setGroups] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  //useEffects functions

  useEffect(() => {
    const cleanUp = db.collection("groups").onSnapshot((snapshot) =>
      setGroups(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      cleanUp();
    };
  }, []);
  //return from function
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <IconButton>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className="sidebar-headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchIcon />
          <input type="text" placeholder="search for a new chat" />
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChats addNewChat />
        {groups.map((group) => (
          <SidebarChats key={group.id} id={group.id} name={group.data.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
