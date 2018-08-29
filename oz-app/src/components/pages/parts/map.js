import React,{Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';
import CityPin from './city-pin';
import ControlPanel from './control-panel';
import CITIES from './data_10.json';
import jsondata from './FinalEthnicity.geojson';
import {defaultMapStyle, dataLayer} from './map-style.js';
import {updatePercentiles} from './utils';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';


const MAPBOX_TOKEN = 'pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA';

class MapSection extends Component{
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -37.8136,
        longitude: 144.9631,
        zoom: 12,
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
  }


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
          this._goToViewport(-37.8840,145.0266);
        }else if (campusPre.campus == 'Parkville') {
          this._goToViewport(-37.7840,144.9587);
        }else if (campusPre.campus == 'Berwick'){
          this._goToViewport(-38.0398,145.3395);
        }else {
          this._goToViewport(-37.8136,144.9631);
        }
    }}

    _loadData = data => {

    updatePercentiles(data, f => f.properties.chinese_population);

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
        style={{left: x, top: y, backgroundColor:'#F08B6F',opacity:1 , color:'#FFF', padding:'5px', borderRadius:'5px'}}>
        <div>Suburb: {hoveredFeature.properties.Suburb}</div>
        <div>Population: {hoveredFeature.properties.Population}</div>
      </div>
    );
  }

    _onViewportChange = viewport => this.setState({
    viewport: {...this.state.viewport, ...viewport}
    });

    _resize = () => this._onViewportChange({
    width: this.props.width || 850,
    height: this.props.height || 650
    });

    _updateViewport = (viewport) => {
    this.setState({viewport});
  };

    _renderCityMarker = (city, index) => {
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <CityPin size={15}/>
        </Marker>
      );
      };


    _renderPopup() {
      const {popupInfo} = this.state;

      return popupInfo && (
        <Popup tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => this.setState({popupInfo: null})} >
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

handlebutton() {
  console.log('button');
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

         {CITIES.map(this._renderCityMarker)}

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
