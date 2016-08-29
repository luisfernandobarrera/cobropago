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
      <div className="uk-panel uk-panel-box" data-uk-sticky="{top:35}">
        <ul className="tm-nav uk-nav uk-nav-side">
          <li className="uk-nav-header">Menu</li>
          <li><Link to="/">Ledgers</Link></li>
          <li><Link to={`user`}>Account</Link></li>
          <li><a href="#" onClick={this.logout}>Logout</a></li>
        </ul>
      </div>

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

