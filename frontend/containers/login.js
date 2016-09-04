import React from 'react';
import LoginForm from '../components/loginform';
import {bindActionCreators} from 'redux';
import {serverLogin} from '../resources/login';
import {connect} from 'react-redux';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(username, password) {
    this.props.login(username, password).then(() => {
        this.context.router.push('/')
      }
    );
  }

  componentDidMount() {
    if (this.props.state.login.get('loggedIn')) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <LoginForm login={this.login} />
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(
  (state)=>({state: state}),
  (dispatch)=>({login: bindActionCreators(serverLogin, dispatch)})
)(Login);
