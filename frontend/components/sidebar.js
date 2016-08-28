import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {serverLogout} from '../resources/login';
import {connect} from 'react-redux';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout()  {
    this.props.serverLogout();
    this.context.router.push('/login');
  }

  render() {
    return (
      <ul className="nav nav-sidebar">
        <li><Link to="/">Home</Link></li>
        <li><Link to={`dashboard`}>Overview</Link></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Export</a></li>
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </ul>
    )

  }
}

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(
  (state)=>({}),
  (dispatch)=>({serverLogout: bindActionCreators(serverLogout, dispatch)})
)(Sidebar);

