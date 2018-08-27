import React,{Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';
import CityPin from './city-pin';
import ControlPanel from './control-panel';
import CITIES from './data_10.json';

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
    }
  }


    componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
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
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 800
    });
    };
    _onStyleChange = popStyle => this.setState({popStyle});

  render(){
    const {viewport, settings} = this.state;

    return(
    <div>
      <div id="mapBox">
        <MapGL
         {...viewport}
         {...settings}
         mapStyle="mapbox://styles/pson0001/cjl9jf0iv3g542rmsrpmemlei"
         onViewportChange={this._onViewportChange}
         dragToRotate={false}
         mapboxApiAccessToken={MAPBOX_TOKEN}>

{CITIES.map(this._renderCityMarker)}
         {this._renderPopup()}
         <ControlPanel
         containerComponent={this.props.containerComponent}
         onClick={this._onStyleChange} />
     </MapGL>
   </div>
    </div>
    )
  }
}

export default MapSection;
