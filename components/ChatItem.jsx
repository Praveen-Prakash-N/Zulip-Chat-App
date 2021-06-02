import React, { Component } from "react";
import Avatar from "./Avatar";

class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const unixTime = this.props.msgTime;

    // console.log(unixTime.includes("/"));

    const date = new Date(unixTime*1000);

    const msgTime = date.toLocaleString("en-us");
    // const unixTime = 1621412193;

// const date = new Date(unixTime*1000);

// const todayDate = new Date().toLocaleString();


// console.log(date.toLocaleString("en-us"));
// console.log("Today's Date is: "+todayDate);
    return (
      <div
        
        className={`${this.props.user ? this.props.user : "sender" }`}
      >
        <div className="chat__item__content">
          <p className="chat__msg">{this.props.msg}</p>
        </div>
        <div className="chat__meta">
            <span>{msgTime}</span>
        </div>
        {/* <Avatar isOnline="active" image={this.props.image} /> */}
      </div>
    );
  }
}

export default ChatItem;
