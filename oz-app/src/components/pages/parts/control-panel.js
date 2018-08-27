import React, {PureComponent} from 'react';

const categories = ['restaurant', 'market', 'support'];

const defaultContainer = ({children}) => <div className="control-panel"
style={{background:'white', margin:'10px 10px 20px 700px',paddingLeft:'10px', borderRadius:'10px'}}>{children}</div>;

export default class StyleControls extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibility: {
        restaurant: false,
        market: false,
        support: false
      },
      color: {
        restaurant: '#DBE2E6',
        market: '#E6EAE9',
        support: '#c0c0c8'
      }
    };
  }

  _onColorChange(name) {
  if (name == 'restaurant'){
    console.log('rrrrrr');
  }
  else if (name == 'market'){
    console.log('mmmmmmm');
  }else{
    console.log('sssssss')
  }
}

  _onVisibilityChange(name, event) {
    const visibility = {...this.state.visibility, [name]: event.target.checked};
    console.log({visibility});
    this.setState({visibility});
  }

  _renderLayerControl(name) {
    const {visibility, color} = this.state;
    return (
      <div key={name} className="input">
        <label>{name}</label>
        <input type="checkbox"
          style={{marginLeft:'10px'}}
          onClick={ this._onVisibilityChange.bind(this, name)}/>
      </div>
    );
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    return (
      <Container >
        <h3>
          Chinese facility:
        </h3>
        {categories.map(name => this._renderLayerControl(name)) }
      </Container>
    );
  }
}