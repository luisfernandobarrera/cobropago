import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router';


export default class Sidebar extends React.Component {
    render() {
        return (
            <ul className="nav nav-sidebar">
                <li><Link to="/">Home</Link></li>
                <li><Link to={`dashboard`}>Overview</Link></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Export</a></li>
            </ul>
        )

    }
}
