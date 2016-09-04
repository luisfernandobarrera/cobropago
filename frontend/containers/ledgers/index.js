import React from 'react';
import LedgerList from '../../components/ledgers';
import {bindActionCreators} from 'redux';
import {actions} from '../../resources/ledger';
import {connect} from 'react-redux';


class LedgerView extends React.Component {
  componentWillMount() {
    this.props.actions.fetchLedgers().then(() => {
      console.log(this.props.state);
    });
  }

  render() {
    let results = this.props.state.items.results || [];
    return (
      <div>
        <LedgerList ledgers={results} />
      </div>
    );
  }
}

export default connect(
  (state)=>({state: state.ledgers}),
  (dispatch)=>({actions: bindActionCreators(actions, dispatch)})
)(LedgerView);

