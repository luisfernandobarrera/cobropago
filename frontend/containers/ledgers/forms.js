import React from 'react';
import {reduxForm, Field} from 'redux-form';



class LedgerForm extends React.Component {
  render() {
    const {fields: {name}, handleSubmit, onSubmit} = this.props;
    return (
      <form className="uk-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Add a new Ledger</h3>
        <Field component="input" type="text" name="name" placeholder="Ledger Name" />
        <button className="uk-button" type="submit">Add</button>
      </form>
    )
  }
}

export let NewLedgerForm = reduxForm({
  form: 'AddLedger',
  fields: ['name']
})(LedgerForm);


NewLedgerForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
