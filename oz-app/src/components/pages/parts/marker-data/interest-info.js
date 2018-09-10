import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const {info} = this.props;
    console.log(info);
    const displayName = `\n\n${info.name}`;

    return (
      <div>
        <div style={{width:'150px', opacity:'0.8'}}>
          {displayName}
        </div>
      </div>
    );
  }
}
