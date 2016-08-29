import $ from 'jquery/dist/jquery';
import React from 'react';
import Sidebar from './components/sidebar';
import Login from './components/login';
import UIKit from "uikit/dist/css/uikit.gradient.css";
import UIJS from 'uikit/dist/js/uikit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './resources/login';
import {Router} from 'react-router';
import {routerMiddleware, push} from 'react-router-redux'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.state.login.get('loggedIn')) {
      this.context.router.push('/login');
    }
  }

  render() {
    return (
      <div className="app">
        <div className="uk-container uk-container-center uk-margin-top">
          <div className="uk-grid">
            <div className="tm-sidebar uk-width-medium-1-4 uk-row-first">
              <Sidebar />
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
}


function mapStateToProps(state) {
  return {
    state: state
  }
}


export default connect(
  mapStateToProps
)(App);
