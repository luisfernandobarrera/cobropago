import React from 'react'
import NavLink from '../modules/navlink'

let Sidebar = React.createClass({
    handleSubmit(event) {
        event.preventDefault();

    },
    render(){
        return (
            <aside className="left-off-canvas-menu">
                <a className="left-off-canvas-toggle" href="#"><i className="fi-list"></i></a>
                <div className="icon-bar vertical eight-up">
                    <NavLink to={`/`} className="item" activeClassName="active" onlyActiveOnIndex={true}>
                        <i className="fi-graph-bar"></i>
                        <label>Dashboard</label>
                    </NavLink>
                    <NavLink to={`/login`} className="item" activeClassName="active">
                        <i className="fi-dollar-bill"></i>
                        <label>Accounts</label>
                    </NavLink>
                    <NavLink to={`/about`} className="item" activeClassName="active">
                        <i className="fi-shopping-cart"></i>
                        <label>Transactions</label>
                    </NavLink>
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