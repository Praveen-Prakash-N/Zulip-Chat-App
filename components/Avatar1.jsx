import React, { Component } from "react";


class Avatar1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
            <div className="avatar1">
                <div className="avatar1-img">
                    <img src={this.props.image} alt="#" />
                </div>
            </div>
        </div>
    );
  }
}

export default Avatar1;