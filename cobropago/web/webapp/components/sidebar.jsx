import React from 'react'
import { Link, RouteHandler } from 'react-router'

let Sidebar = React.createClass({
    render(){
        return (
            <aside class="left-off-canvas-menu">

                <div class="icon-bar vertical five-up">
                    <a class="item">
                        <i class="fi-graph-bar"></i>
                        <label>Dashboard</label>
                    </a>
                    <a class="item">
                        <i class="fi-dollar-bill"></i>
                        <label>Accounts</label>
                    </a>
                    <a class="item">
                        <i class="fi-shopping-cart"></i>
                        <label>Transactions</label>
                    </a>
                    <a class="item">
                        <i class="fi-pricetag-multiple"></i>
                        <label>Budget</label>
                    </a>
                    <a class="item">
                        <i class="fi-page-filled"></i>
                        <label>Reports</label>
                    </a>
                </div>

            </aside>
        )
    }
});

export default Sidebar;