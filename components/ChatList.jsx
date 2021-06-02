import React, { Component } from "react";
import UserService from "../services/UserService";
import "./chatList.css";
//import Popup from './Popup';
import DropDown from './Dropdown';
import ChatListItems from "./ChatListItems";
import ReactHtmlParser from 'react-html-parser';
import NewConvo from "./../images/Add button svg.svg";
import { makeStyles } from '@material-ui/core/styles'; 
import { Button} from "@material-ui/core";

const items = [
  {
    id: 1,
    value: 'New Chat',
  },
  {
    id: 2,
    value: 'New Group',
  }
]

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newChatUsers: [],
      newChatUserName:"",
      newChatUserId: "",
      newChatUserMail: "",
      newChatUserActive: "",
      newChatUserOnline: "",
      newChatUserImage: "",
      newChatUserLastMsg: "",
      newChatUserLastMsgTime: "",
      userReceivers: [],
      userMessages: [],
      newConvoUser: this.props.newConvoUser,
      allChatUsers: [],
      lastmsg: "",
      // lastmsg1: this.props.lastmsg,
    };
    console.log(this.state.newChatUserName);
     
  }

  // createNewChat = () => {

  //   var storedContacts = JSON.parse(localStorage.getItem("newChat"))
  //     console.log(storedContacts);
  //     this.state.newChatUsers.push(storedContacts);
  //     console.log(this.state.newChatUsers.length);

  //   UserService.getUsersMsg(this.state.newChatUsers).then(res => {
  //     console.log(res.data.messages)
  //     this.setState({userMessages: res.data.messages})
  //     this.setState({newChatUserLastMsg: this.state.userMessages[this.state.userMessages.length-1].content});
  //     this.setState({newChatUserLastMsgTime: this.state.userMessages[this.state.userMessages.length-1].timestamp});  
  //     console.log(this.state.newChatUserLastMsg);
  //   })

  //   UserService.getReceiver(this.state.newChatUsers).then(res => {
  //     console.log(res.data.user.email);
  //     this.setState({newChatUserName: res.data.user.full_name});
  //     console.log(this.state.newChatUserName);
  //     this.setState({newChatUserId: res.data.user.user_id});
  //     this.setState({newChatUserMail: res.data.user.email});
  //     this.setState({newChatUserImage: res.data.user.avatar_url});

  //     const newChatUsers = {
  //       full_name: this.state.newChatUserName,
  //       user_id: this.state.newChatUserId,
  //       email: this.state.newChatUserMail,
  //       avatar_url: this.state.newChatUserImage,
  //       lastMsg: this.state.newChatUserLastMsg,
  //       lastMsgTime: this.state.newChatUserLastMsgTime
  //     }
  //     this.state.allChatUsers.push(newChatUsers);
  //   })

  // }

  componentDidMount(){

    var storedContacts = JSON.parse(localStorage.getItem("newChat"))
    console.log(storedContacts);
    this.state.newChatUsers.push(storedContacts);

    UserService.getUsersMsg(storedContacts).then(res => {
      console.log(res.data.messages);
      this.setState({userMessages: res.data.messages});
      this.setState({newChatUserLastMsg: this.state.userMessages[this.state.userMessages.length-1].content});
      this.setState({newChatUserLastMsgTime: this.state.userMessages[this.state.userMessages.length-1].timestamp});
      const newChatUsers = {
        lastMsg: ReactHtmlParser(this.state.newChatUserLastMsg),
        lastMsgTime: this.state.newChatUserLastMsgTime
        }
        this.state.allChatUsers.push(newChatUsers);
        console.log(newChatUsers);
    })

    UserService.getReceiver(storedContacts).then(res => {
      console.log(res.data);
      this.setState({newChatUserName: res.data.user.full_name});
      console.log(this.state.newChatUserName);
      this.setState({newChatUserId: res.data.user.user_id});
      this.setState({newChatUserMail: res.data.user.email});
      this.setState({newChatUserImage: res.data.user.avatar_url});
      const newChatUsers = {
              full_name: this.state.newChatUserName,
              user_id: this.state.newChatUserId,
              email: this.state.newChatUserMail,
              avatar_url: this.state.newChatUserImage,
             }
             this.state.allChatUsers.push(newChatUsers);
              console.log(newChatUsers);
    })
      // const newChatUsers = {
      //   full_name: this.state.newChatUserName,
      //   user_id: this.state.newChatUserId,
      //   email: this.state.newChatUserMail,
      //   avatar_url: this.state.newChatUserImage,
      //   lastMsg: this.state.newChatUserLastMsg,
      //   lastMsgTime: this.state.newChatUserLastMsgTime
      // }
      // this.state.allChatUsers.push(newChatUsers);
    

  }
  

  render() {

    return (
      <div className="main__chatlist">
        <div className="chatlist__header">
          <div className="chatlist__heading">
            <h2>Messages</h2>
          </div>
          <div className="chatList__search">
            <div className="search_wrap">
              <button className="search-btn">
                  <i className="fa fa-search"></i>
              </button>
              <input type="text" placeholder="Search chat" required />
            </div>
          </div>
        </div>
        <div className="chatlist__body">
          <div className="chatlist__items">
            
            {this.state.allChatUsers && this.state.allChatUsers.map((item, index) => {
              return (
                <div>
                  <ChatListItems
                  name={item.full_name}
                  key={item.user_id}
                  key1={item.user_id}
                  mail={item.email}
                  animationDelay={index + 1}
                  active={item.is_bot ? "active" : ""}
                  isOnline={item.is_active ? "active" : ""}
                  image={item.avatar_url}
                  lastMessage={item.lastMsg}
                  lastMessageTime={item.lastMsgTime}
                />  
                </div>
              );
            })}
          </div>
          <div className="new__convo_container">
            <div className="New_convo">
              <DropDown items={items}></DropDown>
              </div>      
          </div>
        </div>
      </div>
    );
  }
} 

export default ChatList;
