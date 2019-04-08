import React from "react";
import { Route, Link } from "react-router-dom";

import MessageScreen from "./MessageScreen";
import requiresAuth from "./requiresAuth";

const MessagesHome = ({ messages, handleSendMessage, emitMessageSocket }) => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/alice" component={MessageScreen} />
      <Route
        path="/test"
        render={props => (
          <MessageScreen
            {...props}
            handleSendMessage={handleSendMessage}
            messages={messages}
            emitMessageSocket={emitMessageSocket}
          />
        )}
      />
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Messsages: </h2>
      <br />
      <Link to="/alice">Alice</Link>
    </>
  );
};

export default requiresAuth(MessagesHome);
