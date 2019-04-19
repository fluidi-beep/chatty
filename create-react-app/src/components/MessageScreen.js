import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MessageBox from "./MessageBox";
import axios from "axios";
import baseURL from "../api/url";
import "./messageScreen.scss";

const MessageScreen = props => {
  const [messageInput, setMessageInput] = useState("");

  const recipientName = window.location.pathname.replace("/chat/", "");

  const sendMessage = event => {
    event.preventDefault();

    props.handleSendMessage(messageInput, recipientName);
    setMessageInput("");
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/users/${localStorage.getItem("id")}/friends`)
      .then(res => {
        const [friend] = res.data.filter(friend => {
          return friend.username === recipientName;
        });
        console.log("FRIEND ID ", friend.socket_id);
        localStorage.setItem("friend_socket_id", friend.socket_id);
      })
      .catch(err => {
        console.log("COULDN'T GET FRIEND: ", err);
      });
    props.getMessages();
    props.updateFriends();
  }, []);

  return (
    <div className="messageScreen">
      <header>
        <Link to="/">
          <a href="/">Go Back</a>
        </Link>
        <h2>{recipientName}</h2>
      </header>
      <MessageBox
        recipientName={recipientName}
        messages={props.messages.filter(message => {
          return message.friendName === recipientName;
        })}
      />
      <form onSubmit={sendMessage}>
        <label htmlFor="Message" />
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MessageScreen;
