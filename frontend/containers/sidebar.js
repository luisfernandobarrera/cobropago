import React from 'react';
import Sidebar from '../components/sidebar';

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Sidebar;
