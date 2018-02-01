import React, { Component } from 'react'
import {getUserInfo} from '../../auth';

class Message extends Component {

  render() {
    // let userInfo = getUserInfo()
    // let userName = userInfo.username;
    let userName = "he";

    let authorClass = "otherauthor";

    // if(userName == this.props.author)
        // authorClass = "meAuthor";

    return (
      <div>
          <span className={authorClass}>{this.props.author}:</span>
          {this.props.message}
      </div>
    )
  }
}

export default Message
