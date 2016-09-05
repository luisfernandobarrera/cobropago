import React from 'react';


export default class LedgerList extends React.Component {
  render() {
    const {onDelete} = this.props;
    return (
      <div className="uk-grid">
        {this.props.ledgers.map(function (item) {
          return (<LedgerItem data={item} key={item.id} onDelete={onDelete} />);
        })}
      </div>
    )
  }
}

LedgerList.propTypes = {
  ledgers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export class LedgerItem extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(values) {
    this.props.onDelete(this.props.data.id);
  }

  render() {
    const {data} = this.props;
    return (
      <div className="uk-width-medium-1-2">
        <div className="uk-panel uk-panel-box">
          <h3 className="uk-panel-title">{data.name}</h3>
          <button className="uk-button uk-button-primary" type="button">Go</button>
          <button className="uk-button uk-button-danger" onClick={this.onDelete} type="button">Delete</button>
        </div>
      </div>
    );
  }
}

LedgerItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired
};
