import React from 'react';
import Sidebar from './components/sidebar';
import Login from './components/login';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Style from './styles/style.css'
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
        <div className="container-fluid">
          <div className="layout row">
            <div className="col-sm-3 col-md-2 sidebar">
              <Sidebar />
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
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
