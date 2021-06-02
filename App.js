import React from 'react';
import "./App.css";
import "./chatBody.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ChatList from './components/ChatList';
//import Nav from './components/Nav';
import ChatContent from './components/ChatContent';
import UserProfile from './components/UserProfile';

import ChatListItems from './components/ChatListItems';
import Popup from './components/Popup';
// import NewChatListItems from './components/NewChatListItems';




function App() {
  return (
    <div className="__main">

          <div className="main__chatbody">
            
            <Router>
              <ChatList />
              <Switch>
                <Route path="/:otherUser" exact component= {ChatContent}></Route>
                {/* <Route path="/ChatList/:otherUser" exact component= {ChatListItems}></Route> */}
              </Switch>
              {/* <UserProfile /> */}
            </Router>  
          </div>
    </div>
  );
}

export default App;
