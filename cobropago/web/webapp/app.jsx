import React from 'react'
import { Link, RouteHandler } from 'react-router'
import Sidebar from './components/sidebar';
import Index from './components/index';

let App = React.createClass({

    render() {
        return(
            <div class="off-canvas-wrap move-right" data-offcanvas>
                <div class="inner-wrap">
                    <a class="left-off-canvas-toggle" href="#"><i class="fi-list"></i></a>
                    <Sidebar />
                    <div id="main-content">
                        {this.props.children || <Index />}
                    </div>
                    <a class="exit-off-canvas"></a>
                </div>
            </div>
        );
    }
});

export default App;