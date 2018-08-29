import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.Name} | ${info.Group}`;

    return (
      <div>
        <div style={{width:'150px', opacity:'0.8'}}>
          {displayName}
        </div>
      </div>
    );
  }
}
