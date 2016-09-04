import $ from 'jquery/dist/jquery';
import React from 'react';
import Sidebar from './containers/sidebar';
import UIKit from "uikit/dist/css/uikit.gradient.css";
import UIJS from 'uikit/dist/js/uikit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as login from './resources/login';
import {Router} from 'react-router';
import {routerMiddleware, push} from 'react-router-redux';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    const { router } = this.context;
    const { state } = this.props;
    if (!state.login.get('loggedIn'))
      router.push('/login');
  }

  componentWillUpdate () {
    const { router } = this.context;
    const { state } = this.props;
    if (!state.login.get('loggedIn'))
      router.push('/login');
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <div className="app">
        <div className="uk-container uk-container-center uk-margin-top">
          <div className="uk-grid">
            <div className="tm-sidebar uk-width-medium-1-4 uk-row-first">
              <Sidebar logout={this.logout} />
            </div>
            <div className="uk-width-medium-3-4">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )

  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

App.propTypes = {
  logout: React.PropTypes.func.isRequired
};


export default connect(
  (state)=>({state: state}),
  (dispatch)=>({logout: bindActionCreators(login.serverLogout, dispatch)})
)(App);
