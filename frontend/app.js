import React from 'react';
import Layout from './components/layout';
import Login from './components/login';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Style from './styles/style.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: true}
    }

    render() {
        if (this.state.login) {
            return <Layout/>
        } else {
            return <Login/>
        }
    }
}
