import React from 'react';
import Sidebar from './sidebar';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <Sidebar/>
            </div>
        )
    }
}
