import React from 'react'
import { Link, RouteHandler } from 'react-router'
import Sidebar from './components/sidebar';
import Header from './components/header'
import Index from './components/index';

let App = React.createClass({

    render() {
        return(
            <div className="off-canvas-wrap move-right" data-offcanvas>
                <div className="inner-wrap">
                    <Header />
                    <Sidebar />
                    <div className="off-canvas-wrap">
                      <main className="inner-wrap">{this.props.children}</main>
                    </div>

                    <a className="exit-off-canvas"></a>
                </div>
            </div>
        );
    }
});

export default App;