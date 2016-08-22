import React from 'react';
import Sidebar from './components/sidebar';
import Login from './components/login';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Style from './styles/style.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: true};
    }

    render() {
        if (this.state.login) {
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
        } else {
            return <Login/>
        }
    }
}
