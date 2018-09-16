import React,{Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';
import ControlPanel from './control-panel';

import AmusementPin from './marker-data/amuseument-pin';
import Amusement from './marker-data/amusement.json';

import jsondata from './population_15.geojson';
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
      console.log(this.props.campus,campusPre.campus);
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
