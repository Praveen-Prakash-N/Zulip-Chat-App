import React, { Component } from "react";
import UserService from "../services/UserService";
import "./userProfile.css";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Button } from "@material-ui/core";

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          userData: this.props.userData,
          receiverDetails: [],
        }
    }
    

    toggleInfo = () => (!this.state.open);

  
  componentDidMount () {

    UserService.getReceiver(this.state.userData).then(response => {
      this.setState({receiverDetails: [response.data.user]}); 
    })

  }

  render() {
    return (
      <div className="main__userprofile">
          <div className="profile__card user__profile__image">
            <div className="container__about">
              <div className="about">
                <h2>About</h2>  
              </div>
              <div className="close">
                <span>X</span>
              </div>
            </div>
            {this.state.receiverDetails && this.state.receiverDetails.map((item, index) => {
              return (
                <div>
                  <div className="container">
                    <div className="profile__image">
                      <img src={item.avatar_url} />
                    </div>
                    <div className="name">
                      <h4>{item.full_name}</h4>
                    </div>
                  </div>
                  <div className="container__mail">
                    <div className="mail_icon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <div className="mail_id">
                      <p>{item.email}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            
            <div className="container__institution">
              <div className="institution_icon">
                <i className="fa fa-university"></i>
              </div>
              <div className="institution_name">
                <p>PSG College of engineering</p>
              </div>
            </div>
            <div className="container__phone_no">
              <div className="phone_no_icon">
                <i className="fa fa-phone"></i>
              </div>
              <div className="phone_no">
                <p>9796677378</p>
              </div>
            </div>
            <div className="container__media">
              <h3>Media</h3>
              <div className="media_table">
                <table>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                  </tr>
                </table>
              </div>
              <h6>View More</h6>
            </div>
          </div>
      </div>
    );
  }
}
