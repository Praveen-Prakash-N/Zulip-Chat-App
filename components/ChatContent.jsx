import React, { Component, createRef } from "react";
import axios from 'axios';
import "./chatContent.css";
import Avatar1 from "./Avatar1";
import ChatItem from "./ChatItem";
import Button from '@material-ui/core/Button';
import SendMsg from "./../images/Send button svg.svg";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
// import ViewUserInfo from "./../images/View Info button svg.svg";
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ReactHtmlParser from 'react-html-parser';
import UserService from "../services/UserService";
import UserProfile from "./UserProfile";


class ChatContent extends Component {

  messagesEndRef = createRef(null);

    constructor(props) {
        super(props)
        
        this.state = {
            userReceiver: this.props.match.params.otherUser,
            userMsg: [],
            receiverName: "",
            receiverImage: "",
            receiverPresence: {},
            newMsg: [],
            chat: [],
            msg: "",
            othersLongPollResponse: {},
            presenceOfReceiver: {},
            receiverOnlineTime: "",
            presentTime: "",
            currentTime: "",
            receiverLongPollId: "",
            receiverLongPollMsg: "",
            receiverLongPollImage: "",
            receiverLongPollMsgTime: "",
            senderLongPollId: "",
            senderLongPollMsg: "",
            senderLongPollImage: "",
            senderLongPollMsgTime: "",
            adminMail: "",
            longPollResponse: {},
            open: false,        
        }
        console.log(this.state.userReceiver)
    }

    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    toggle = () => {
      this.setState({open: !this.state.open})
    }

    sendMessage = () => {
      axios.post('http://localhost:8080/send', {
          msg: this.state.msg,
          user: this.state.userReceiver
      });

  
      // const presentTime = new Date().toLocaleString();
      // var chatItms = {
      //   key: this.state.chat.length + 1,
      //   type: "",
      //   msg: this.state.msg,
      //   msgTime: presentTime,
      //   image: this.state.adminImage  
      // }

      // this.state.chat.push(chatItms);
      
  
      this.scrollToBottom();  
      this.setState({ msg: "" });
    };

    subscribe = async () => {
      let response = await axios.post('http://localhost:8080/registerForMessageEvents',{username: this.state.admin});
      if(response.data.result === 'error') {
        await this.subscribe();
      } else if (response.data.result === 'success'){
        let qid = response.data.queue_id;
        let msgL = await axios.post('http://localhost:8080/longpoll',{queue_id: qid});
        this.setState({newMsg: msgL.data})
        
        if(this.state.newMsg.events[0].type === "heartbeat"){
          await this.subscribe();
        } else if (this.state.newMsg.events[0].type === "message") {
          if(this.state.newMsg.events[0].message.sender_email === this.state.userReceiver) {
            this.setState({receiverLongPollResponse: this.state.newMsg.events[0].message});
            this.setState({receiverLongPollId: this.state.newMsg.events[0].message.id});
            this.setState({receiverLongPollMsg: this.state.newMsg.events[0].message.content});
            this.setState({receiverLongPollImage: this.state.newMsg.events[0].message.avatar_url});
            this.setState({receiverLongPollMsgTime: this.state.newMsg.events[0].message.timestamp});

            const chatItms = {
              key: this.state.receiverLongPollId,
              type: "receiver",
              msg: this.state.receiverLongPollMsg,
              msgTime: this.state.receiverLongPollMsgTime,
              image: this.state.receiverLongPollImage  
            }
            
            this.state.chat.push(chatItms);
            this.scrollToBottom();
            
          } if(this.state.newMsg.events[0].message.sender_email === this.state.adminMail) {
            this.setState({senderLongPollResponse: this.state.newMsg.events[0].message});
            this.setState({senderLongPollId: this.state.newMsg.events[0].message.id});
            this.setState({senderLongPollMsg: this.state.newMsg.events[0].message.content});
            this.setState({senderLongPollImage: this.state.newMsg.events[0].message.avatar_url});
            this.setState({senderLongPollMsgTime: this.state.newMsg.events[0].message.timestamp});

            const chatItms = {
              key: this.state.senderLongPollId,
              type: "sender",
              msg: this.state.senderLongPollMsg,
              msgTime: this.state.senderLongPollMsgTime,
              image: this.state.senderLongPollImage  
            }
            
            this.state.chat.push(chatItms);
            this.scrollToBottom();
          }
          this.scrollToBottom();
        }
        await this.subscribe();
      }
    }

    userPresence = () => {
      UserService.getReceiverPresence(this.state.userReceiver).then( res => {
        this.setState({receiverPresence: res.data.presence.website.timestamp})
        const unixTime = this.state.receiverPresence;
        const date = new Date(unixTime*1000);
        const onlineTime = date.toLocaleString("en-us");
        this.setState({receiverOnlineTime: onlineTime})
      })
    } 

    getPresentTime = () => {
      const presentTime = new Date().toLocaleString();
      this.setState({presentTime: presentTime})
    }

    getAdmin = () => {
      UserService.getOwnUser().then( response => {
        let ownUserEmail = response.data.email;
        this.setState({adminMail: ownUserEmail});
        console.log(this.state.adminMail);
      })  
    }

   
    componentDidMount() {
      
      
      UserService.getUsersMsg(this.state.userReceiver).then( res => {
        this.setState({userMsg: res.data.messages })
        console.log(res.data);
      });

      UserService.getReceiver(this.state.userReceiver).then( res => {
        this.setState({receiver: res.data.user})
        this.setState({receiverName: res.data.user.full_name})
        this.setState({receiverImage: res.data.user.avatar_url})
      })

      UserService.getOwnUser().then( response => {
        let ownUserEmail = response.data.email;
        let ownUserImage = response.data.avatar_url;
        this.setState({admin: ownUserEmail}, () => {
          console.log(this.state.admin, 'admin')
        });
        this.setState({adminImage: ownUserImage}, () => {
          console.log(this.state.adminImage, 'admin')
        });
        this.setState({adminMailId: this.state.admin})
        console.log(this.state.admin);
      })
      console.log(this.state.adminImage, 'admin1')
      const presentTime = new Date().toLocaleString();

      // window.addEventListener("keydown", (e) => {
      //   if (e.keyCode === 13 ) {
      //     if (this.state.msg !== "") {
      //       const chatItms = {
      //         key: this.state.chat.length + 1,
      //         type: "",
      //         msg: this.state.msg,
      //         msgTime: presentTime,
      //         image: this.state.adminImage  
      //       }
      //       this.state.chat.push(chatItms);
      //       this.sendMessage();
      //       this.scrollToBottom();  
      //       this.setState({ msg: "" });
      //     }
      //   }
      // });

      this.interval = setInterval(() => this.setState({presenceOfReceiver: this.userPresence()}), 1000);
      this.interval1 = setInterval(() => this.setState({currentTime: new Date().toLocaleString()}), 1000);
      this.subscribe();
      this.scrollToBottom();
      this.getAdmin();
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      clearInterval(this.interval1)
    }
    

    onStateChange = (e) => {
        this.setState({ msg: e.target.value });    
    };


  render() {
    var isSender = this.state.admin;

    return (
      <div className="main__chatcontent">
        <div class="chat_body_background">
          <div className="chat_body">
            <div className="content__header">
              <div className="blocks">
                <div className="current-chatting-user">
                  
                  <Avatar1
                    isOnline="active"
                    image={this.state.receiverImage}
                  />
                  <div className="container_name_online">
                    <div className="receiver_name">
                      <p>{this.state.receiverName}</p>
                    </div>
                    <div className="receiver_online">
                      <div className="receiver_status">
                        <span>{this.state.presenceOfReceiver === this.state.currentTime ? "Online" : "Offline"}</span>
                      </div>
                      <div tabIndex={0} className="view_info" role="button" onClick={() => this.toggle(!this.state.open)}>
                        <div className="view_info_toggleInfo">
                          <p>{this.state.open ? <BsIcons.BsThreeDotsVertical/> : <BsIcons.BsThreeDotsVertical/> }</p>
                        </div>
                      </div>
                      {this.state.open && (
                        <div className="view_info_toggle">
                          <UserProfile userData={this.state.userReceiver}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content__body">
              <div className="chat__items">
              
                {this.state.userMsg && this.state.userMsg.map((itm, index) => {
                    return (
                      <ChatItem
                        animationDelay={index + 2}
                        key={itm.id}
                        user={(itm.sender_email === isSender) ? "" : "receiver" }
                        msg={ReactHtmlParser(itm.content)}
                        msgTime={itm.timestamp}
                        image={itm.avatar_url}
                      />
                    );
                })}
                {this.state.chat && this.state.chat.map((itm, index) => {
                  return (
                    <ChatItem
                      animationDelay={index + 2}
                      key={itm.key}
                      user={itm.type ? itm.type : "sender"}
                      msg={itm.msg}
                      msgTime={itm.msgTime}
                      image={itm.image}
                    />
                  );
                })}
                <div ref={this.messagesEndRef} />
              </div>
            </div>
            <div className="content__footer">
              <div className="sendNewMessage">
                <button className="addFiles">
                  <i className="fa fa-paperclip"></i>
                </button>
                <input
                    type="text"
                    placeholder="Type your message here"
                    onChange={this.onStateChange}
                    value={this.state.msg}
                />
              </div>
              <div className="send_button">
                <Button variant="contained" id="sendMessage" onClick={this.sendMessage}><img src={SendMsg} /></Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default ChatContent;
