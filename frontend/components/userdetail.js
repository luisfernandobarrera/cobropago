import React from 'react';
import {apiMe} from '../resources/index';


export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: ''
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token') ||'';

    fetch(apiMe, {headers:{
      'Authorization': 'Token ' + token
    }}).then((result) => {
      return result.json()
    }).then((json) => {
      console.log(json);
      this.setState(json)
    }).catch((ex) => {
      console.log("Error loading User")
    })
  }

  render() {
    if (!!this.state.username) {
      return (
        <div>
          <h1>¡Hello {this.state.username}!</h1>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}





