import React,{Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';
import ControlPanel from './control-panel';

import AmusementPin from './marker-data/amuseument-pin';
import Amusement from './marker-data/amusement.json';
import FitnessPin from './marker-data/fitness-pin';
import Fitness from './marker-data/fitness.json';
import FoodPin from './marker-data/food-pin';
import Food from './marker-data/food.json';
import HealthcarePin from './marker-data/healthcare-pin';
import Healthcare from './marker-data/healthcare.json';
import LaundryPin from './marker-data/laundry-pin';
import Laundry from './marker-data/laundry.json';
import LivingPin from './marker-data/living-pin';
import Living from './marker-data/living.json';
import SecurityPin from './marker-data/security-pin';
import Security from './marker-data/security.json';
import SocialPin from './marker-data/social-pin';
import Social from './marker-data/social.json';
import SportsPin from './marker-data/sports-pin';
import Sports from './marker-data/sports.json';
import SupermarketsPin from './marker-data/supermarkets-pin';
import Supermarkets from './marker-data/supermarkets.json';
import UniversitiesPin from './marker-data/univerisities-pin';
import Universities from './marker-data/univerisities.json';
import ChinesePin from './marker-data/chinese-pin';
import Chinese from './marker-data/chinese.json';

import jsondata from './EthinicityV4.geojson';
import {defaultMapStyle, dataLayer} from './map-style.js';
import {updatePopulation} from './utils';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';
import CityInfo from './marker-data/city-info';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA';

const navStyle = {
  position: 'absolute',
  bottom: 30,
  left: 0,
  padding: '10px'
};

class MapSection extends Component{
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -25.2744,
        longitude: 133.7751,
        zoom: 3,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      campusPre:'',
      popupInfo: null,
      popStyle: '',
      mapStyle: defaultMapStyle,
      year: 2015,
      data: null,
      hoveredFeature: null,
    }
  };


    componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    requestJson(jsondata, (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
    }

    componentWillUpdate(campusPre){
      if(this.props.campus !== campusPre.campus){
        if( campusPre.campus == 'Clayton'){
          this._goToViewport(-37.9150,145.1300);
        }else if (campusPre.campus == 'Caulfield') {
          this._goToViewport(-37.8770,145.0443);
        }else if (campusPre.campus == 'Parkville') {
          this._goToViewport(-37.7840,144.9587);
        }else if (campusPre.campus == 'Peninsula'){
          this._goToViewport(-38.1526,145.1361);
        }else {
          this._goToViewport(-37.8136,144.9631);
        }
    }}

    _loadData = data => {

    updatePopulation(data, f => f.properties.chinese_population);

    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'chinese_population'], fromJS({type: 'geojson', data}))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    this.setState({data, mapStyle});
  };

  _onHover = event => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature,x, y} = this.state;

    return hoveredFeature && (
      <div className="tooltip"
        style={{left: 0, top: 0, width:'400px',fontFamily:'Montserrat', fontSize:'14px',backgroundColor:'#FF8567',opacity:1 , color:'#FFF', padding:'10px 10px 10px 10px', borderRadius:'5px'}}>
        <div>Suburb: {hoveredFeature.properties.Suburb}</div>
        <div>Population of Chinese Resident: {hoveredFeature.properties.Population}</div>
      </div>
    );
  }

    _onViewportChange = viewport => this.setState({
    viewport: {...this.state.viewport, ...viewport}
    });

    _resize = () => this._onViewportChange({
    width: this.props.width || 870,
    height: this.props.height || 650
    });

    _updateViewport = (viewport) => {
    this.setState({viewport});
  };

      _renderPopup() {
         const {popupInfo} = this.state;

         return popupInfo && (
           <Popup tipSize={5}
             anchor="top"
             longitude={popupInfo.longitude}
             latitude={popupInfo.latitude}
             onClose={() => this.setState({popupInfo: null})} >
             <CityInfo info={popupInfo} />
           </Popup>
         );
       }

    _goToViewport = (latitude,longitude) => {
    this._onViewportChange({
      latitude: latitude,
      longitude: longitude,
      zoom: 13,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 800
    });
    };
    _onStyleChange = popStyle => this.setState({popStyle});

    _renderAmuseumentPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <AmusementPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderFitnessPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <FitnessPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderFoodPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <FoodPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderHealthcarePin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <HealthcarePin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderLaundryPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <LaundryPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderLivingPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <LivingPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderSecurityPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <SecurityPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderSocialPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <SocialPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderSportsPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <SportsPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderSupermarketsPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <SupermarketsPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderUniversitiesPin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <UniversitiesPin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }
    _renderChinesePin = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <ChinesePin size={30} onClick={() => this.setState({popupInfo: city})} />
        </Marker>
      );
    }



  render(){
    const {viewport, settings, mapStyle} = this.state;

    return(
    <div>
      <div id="mapBox">
        <MapGL
         {...viewport}
         {...settings}
         mapStyle={mapStyle}
         onViewportChange={this._onViewportChange}
         dragToRotate={false}
         mapboxApiAccessToken={MAPBOX_TOKEN}
         onHover={this._onHover}>
         {this._renderTooltip()}

         {Amusement.map(this._renderAmuseumentPin)}
         {Fitness.map(this._renderFitnessPin)}
         {Healthcare.map(this._renderHealthcarePin)}
         {Laundry.map(this._renderLaundryPin)}
         {Living.map(this._renderLivingPin)}
         {Security.map(this._renderSecurityPin)}
         {Social.map(this._renderSocialPin)}
         {Sports.map(this._renderSportsPin)}
         {Supermarkets.map(this._renderSupermarketsPin)}
         {Universities.map(this._renderUniversitiesPin)}
        {Food.map(this._renderFoodPin)}
        {Chinese.map(this._renderChinesePin)}

          {this._renderPopup()}
          <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

         <ControlPanel
         containerComponent={this.props.containerComponent}
         onClick={this._onStyleChange}></ControlPanel>
     </MapGL>
   </div>
    </div>
    )
  }
}

export default MapSection;
