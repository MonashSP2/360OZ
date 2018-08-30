import React, {PureComponent} from 'react';
import './control-panel.css'

const categories = ['Amusement', 'Fitness', 'Healthcare','Laundry', 'Living', 'Security Services','Social Activities','Sports','Supermarkets','Universities'];

const defaultContainer = ({children}) => <div className="control-panel"
style={{background:'white', margin:'10px 10px 20px 670px',padding:'10px 20px 20px 20px',opacity:'0.8', borderRadius:'10px'}}>{children}</div>;

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
  _onVisibilityChange(name, event) {
    const visibility = {...this.state.visibility, [name]: event.target.checked};
    console.log({visibility});
    this.setState({visibility});
  }

  _renderLayerControl(name) {
    const {visibility, color} = this.state;
    return (
      <div>
        <label>{name}</label>
      </div>
    );
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    return (
      <Container >
        <h3>
          Facilities:
        </h3>
          <p id='amusement'>Amusement</p>
          <p id='fitness'>Fitness</p>
          <p id='healthcare'>Healthcare</p>
          <p id='laundry'>Laundry</p>
          <p id='living'>Living</p>
          <p id='security'>Security Services</p>
          <p id='social'>Social Activities</p>
          <p id='sports'>Sports</p>
          <p id='supermarkets'>Supermarkets</p>
          <p id='universities'>Universities</p>
          <p id='restaurant'>Restaurant</p>
          <p id='chinese'>Chinese Cuisine</p>


      </Container>
    );
  }
}
