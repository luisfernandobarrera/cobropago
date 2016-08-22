import React from 'react';
import Sidebar from './sidebar';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="container-fluid">
                    <div className="layout row">
                        <Sidebar/>
                    </div>
                </div>
            </div>
    )
    }
    }
