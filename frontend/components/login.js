import React from 'react';
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
      ()=> {
        this.context.router.push('/')
      }
    );
  }

  componentDidMount() {
    if (this.props.state.login.get('loggedIn')) {
      this.context.router.push('/');
    }
  }

  //
  // render() {
  //   return (
  //     <div className="container">
  //       <form className="form-signin" onSubmit={this.submit}>
  //         <h2 className="form-signin-heading">Please sign in</h2>
  //         <label htmlFor="inputEmail" className="sr-only">Email address</label>
  //         <input ref="username" type="text" id="inputUsername" className="form-control" placeholder="Username"
  //                required/>
  //         <label htmlFor="inputPassword" className="sr-only">Password</label>
  //         <input ref="password" type="password" id="inputPassword" className="form-control"
  //                placeholder="Password" required/>
  //         <div className="checkbox">
  //           <label>
  //             <input type="checkbox" value="remember-me"/> Remember me
  //           </label>
  //         </div>
  //         <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  //       </form>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div className="uk-vertical-align uk-text-center uk-height-1-1">
        <div className="uk-vertical-align-middle" style={{width: "250px"}}>
          <img className="uk-margin-bottom" width="140" height="120"
               src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTQwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9Ii0yOS41IDI3NS41IDE0MCAxMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTI5LjUgMjc1LjUgMTQwIDEyMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0tNi4zMzMsMjk4LjY1NHY3My42OTFoOTMuNjY3di03My42OTFILTYuMzMzeiBNNzkuNzg4LDM2NC4zNTVIMS42NTZ2LTU3LjcwOWg3OC4xMzJWMzY0LjM1NXoiLz4NCgk8cG9seWdvbiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjUuODYsMzU4LjE0MSAyMS45NjIsMzQxLjIxNiAyNy45OTUsMzQzLjgyNyA0Ny4wMzIsMzIzLjU2MSA1NC41MjQsMzMyLjUyMyA1Ny45MDUsMzMwLjQ4IA0KCQk3Ni4yMDMsMzU4LjE0MSAJIi8+DQoJPGNpcmNsZSBmaWxsPSIjRDhEOEQ4IiBjeD0iMjQuNDYyIiBjeT0iMzIxLjMyMSIgcj0iNy4wMzQiLz4NCjwvZz4NCjwvc3ZnPg0K"
               alt=""/>

          <form className="uk-panel uk-panel-box uk-form" onSubmit={this.submit}>
            <div className="uk-form-row">
              <input ref="username" className="uk-width-1-1 uk-form-large" type="text" placeholder="Username"/>
            </div>
            <div className="uk-form-row">
              <input ref="password" className="uk-width-1-1 uk-form-large" type="password" placeholder="Password"/>
            </div>
            <div className="uk-form-row">
              <input type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#" value="Login"></input>
            </div>
            <div className="uk-form-row uk-text-small">
              <label className="uk-float-left"><input type="checkbox"/> Remember Me</label>
              <a className="uk-float-right uk-link uk-link-muted" href="#">Forgot Password?</a>
            </div>
          </form>

        </div>
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





