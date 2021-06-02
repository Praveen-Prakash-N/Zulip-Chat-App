import React from "react";
import UserService from "../services/UserService";

import './popup.css';
import { Link } from 'react-router-dom'
import NewPop from "./../images/Vector.svg";
import Avatar1 from "./Avatar1";
import { Button} from "@material-ui/core";
import ChatListItems from "./ChatListItems";


 
class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      allChatUsers: [],
      otherUser: this.props.mail,
    };
  }

  createNewChat = (email) => {
    this.state.emails.push(email)
    localStorage.setItem("newChat", JSON.stringify(this.state.emails));
  }

  componentDidMount(){
      UserService.getUsers().then((res) => {
        console.log(res.data);
          this.setState({ allChatUsers: res.data.members });
      });
      
  }

  selectChat(otherUser) {
    this.props.history.push(`/ChatList/${otherUser}`)
  }
    render() {
      return (
        
        <div className='popup'>
          {/* <Link to={`/ChatList/${this.state.otherUser}`} style={{ textDecoration: 'none' }}> */}
        <div 
          key={this.state.otherUser}
          style={{ animationDelay: `0.${this.props.animationDelay}s` }}
          onClick={ () => this.selectChat(this.state.otherUser)}
          className={`chatlist__item ${
            this.props.active ? this.props.active : ""
          } `}
        ></div>
          <div className='popup_inner'>
            <div className='popup_inner_header'>
              <div className='popup_header_title'>
                <h1>{this.props.text}</h1>
              </div>
              <div className='popup_closer_btn'>
              <p id="Newpop" onClick={this.props.closePopup} ><img src ={NewPop}></img></p>
              </div>
            </div>
            <div className="newconvo_chatList__search">
              <div className="newconvo_search__wrap">
                <button className="newconvo_search__btn">
                  <i className="fa fa-search"></i>
                </button>
                <input type="text" placeholder="Search people"/>
              </div>
            </div>
            <div className="chatList_people">
              <p>People</p>
            </div>
              <div className="newconvo_chatlist__items">
              {this.state.allChatUsers && this.state.allChatUsers.map((item, index) => {
              return (
                <div key={item.email} 
                  style={{ animationDelay: `0.${this.props.animationDelay}s` }} 
                  onClick={() =>  this.createNewChat(item.email)}
                  className={`newconvo_chatlist__item ${
                    this.props.active ? this.props.active : ""
                  } `}
                >
                  <div className="avatar1_image">
                    <Avatar1 
                      image={
                        item.avatar_url ? item.avatar_url : "http://placehold.it/80x80"}
                    />
                  </div>

                  <div className="container___name">
                    <div className="user_Meta">
                      <p>{item.full_name}</p>
                    </div>
                  </div>

                </div>
                  
              );
            })}
             </div>
            </div>
          
          
          {/* </Link> */}
        </div>
        
      );
    }
  }
 
export default Popup;