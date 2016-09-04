import React from 'react';


export default class LedgerList extends React.Component {
  render() {
    return (
      <div className="uk-grid">
        {this.props.ledgers.map(function (item) {
          return (<LedgerItem name={item.name} key={item.id} />);
        })}
      </div>
    )
  }
}

LedgerList.propTypes = {
  ledgers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export class LedgerItem extends React.Component {
  render() {
    return (
      <div className="uk-width-medium-1-2">
        <div className="uk-panel uk-panel-box">
          <h3 className="uk-panel-title">{this.props.name}</h3>
          <button className="uk-button uk-button-primary" type="button">Go</button>
        </div>
      </div>
    );
  }
}

LedgerItem.propTypes = {
  name: React.PropTypes.string.isRequired
};
