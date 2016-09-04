import React from 'react';
import LedgerList from '../../components/ledgers';
import {bindActionCreators} from 'redux';
import {actions} from '../../resources/ledger';
import {connect} from 'react-redux';
import {reset} from 'redux-form';
import {NewLedgerForm} from './forms'



class LedgerView extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    if (this.props.login.get('loggedIn')) {
      this.props.actions.fetchLedgers();
    }
  }

  create(values) {
    this.props.actions.createLedger(values).then(() => {
      this.props.actions.fetchLedgers();
      this.context.store.dispatch(reset('AddLedger'));
    });
  }

  render() {
    let results = this.props.state.items.results || [];
    return (
      <div>
        <NewLedgerForm onSubmit={this.create} />
        <LedgerList ledgers={results} />
      </div>
    );
  }
}


LedgerView.contextTypes = {
  store: React.PropTypes.object.isRequired
};


export default connect(
  (state)=>({state: state.ledgers, login: state.login}),
  (dispatch)=>({actions: bindActionCreators(actions, dispatch)})
)(LedgerView);


