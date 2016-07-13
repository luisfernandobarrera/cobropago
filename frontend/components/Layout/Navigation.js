/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.refs.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.refs.root);
  }

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

}

export default Navigation;
