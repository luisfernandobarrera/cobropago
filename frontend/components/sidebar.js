import React from 'react';
import {Button} from 'react-bootstrap';


export default class Sidebar extends React.Component {
    render() {
        return (
            <ul className="nav nav-sidebar">
                <li className="active"><a href="#">Overview</a></li>
                <li><a href="#">Reports</a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Export</a></li>
            </ul>
        )

    }
}
