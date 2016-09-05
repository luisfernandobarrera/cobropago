import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import $ from 'jquery/dist/jquery';
import UIKit from "uikit/dist/css/uikit.gradient.css";
import UIJS from 'uikit/dist/js/uikit';
import LoginForm from '../loginform';
import Sidebar from '../sidebar';
import LedgerView from '../ledgers';

storiesOf('Login', module)
  .add('Login', () => (
    <LoginForm login={() => {action('login')}} />
  ));

storiesOf('Sidebar', module)
  .addDecorator((getStory) => {
    return (
      <div className="app">
        <div className="uk-container uk-container-center uk-margin-top">
          <div className="uk-grid">
            <div className="tm-sidebar uk-width-medium-1-4 uk-row-first">
              {getStory()}
            </div>
            <div className="uk-width-medium-3-4">
            </div>
          </div>
        </div>
      </div>
    )
  })
  .add('Menu', () => (
    <Sidebar logout={action('logout')} />
  ));


storiesOf('Ledgers', module)
  .add('With Ledgers', () => (
    <LedgerView onDelete={()=> {}}
                ledgers={[{id: 12345, name: 'My ledger'},
                          {id: 11241, name: 'Personal'},
                          {id: 12412, name: 'Company'}]}/>
  ));
