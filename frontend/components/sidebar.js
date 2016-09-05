import React from 'react';
import {Link} from 'react-router';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="uk-panel uk-panel-box" data-uk-sticky="{top:35}">
        <ul className="tm-nav uk-nav uk-nav-side">
          <li className="uk-nav-header">Menu</li>
          <li><Link to="/">Ledgers</Link></li>
          <li><Link to={`user`}>Account</Link></li>
          <li><a href="#" onClick={() => {this.props.logout()}}>Logout</a></li>
        </ul>
      </div>
    )
  }
}

Sidebar.propTypes = {
  logout: React.PropTypes.func.isRequired
};


