import React from 'react';
import * as styles from '../styles/signin.css';
import {bindActionCreators} from 'redux';
import {serverLogin} from '../resources/login';
import {connect} from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
        let username = this.refs.username.value.trim();
        let password = this.refs.password.value.trim();
        this.props.serverLogin(username, password).then(
          ()=>{
            this.context.router.push('/')
          });

    }

    componentDidMount() {
        if (this.props.state.login.loggedIn) {
            this.context.router.push('/');
        }
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.submit}>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input ref="username" type="text" id="inputUsername" className="form-control" placeholder="Username"
                           required/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input ref="password" type="password" id="inputPassword" className="form-control"
                           placeholder="Password" required/>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(
    (state)=>({state: state}),
    (dispatch)=>({serverLogin: bindActionCreators(serverLogin, dispatch)})
)(Login);





