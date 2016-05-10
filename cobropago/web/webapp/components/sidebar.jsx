import React from 'react'
import { Link, RouteHandler } from 'react-router'

let Sidebar = React.createClass({
    render(){
        return (
            <aside className="left-off-canvas-menu">
                <a className="left-off-canvas-toggle" href="#"><i className="fi-list"></i></a>
                <div className="icon-bar vertical eight-up">
                    <Link to={`/`} className="item">
                        <i className="fi-graph-bar"></i>
                        <label>Dashboard</label>
                    </Link>
                    <Link to={`/login`} className="item">
                        <i className="fi-dollar-bill"></i>
                        <label>Accounts</label>
                    </Link>
                    <Link to={`/about`} className="item">
                        <i className="fi-shopping-cart"></i>
                        <label>Transactions</label>
                    </Link>
                    <a className="item">
                        <i className="fi-pricetag-multiple"></i>
                        <label>Budget</label>
                    </a>
                    <a className="item">
                        <i className="fi-page-filled"></i>
                        <label>Reports</label>
                    </a>
                </div>

            </aside>
        )
    }
});

export default Sidebar;