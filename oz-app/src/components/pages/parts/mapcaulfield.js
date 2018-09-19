import React, {Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';

import SchoolPin from './marker-data/school-pin';
import School from './marker-data/school.json';

import RestaurantPin from './marker-data/restaurant-pin';
import ClinicPin from './marker-data/clinic-pin';
import CommunityPin from './marker-data/community-pin';
import StorePin from './marker-data/store-pin';
import InterestPin from './marker-data/interest-pin';

import jsondata from './Ethnicity.geojson';
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

class CaulfieldMapSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
              latitude: -37.8770,
      longitude: 145.0443,
                zoom: 13,
                bearing: 0,
                pitch: 0,
                width: 500,
                height: 500,
            },
            campusPre: '',
            popupInfo: null,
            popStyle: '',
            mapStyle: defaultMapStyle,
            data: null,
            hoveredFeature: null,
            show: false,
            show_clinics: false,
            show_communities: false,
            show_stores: false,
            show_interests: false,
            isLoaded: false,
            items: [],//restaurants
            clinics: [],
            stores: [],
            communities: [],
            interests: []
        }
    };

  componentDidUpdate(prevProps) {
    const interest = this.props.interest;

   if (this.props.interest !== prevProps.interest) {
     this._onViewportChange()
   }
  }

    componentDidMount() {
        // let interest = this.props.defau;

        const {longitude, latitude, zoom} = this.state.viewport;
        window.addEventListener('resize', this._resize);
        this._resize();
        requestJson(jsondata, (error, response) => {
            if (!error) {
                this._loadData(response);
            }
        });


        console.log(longitude, latitude, zoom);

    }

    componentWillUnmount() {

        window.removeEventListener('resize', this._resize);
    }

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
        const {hoveredFeature, x, y} = this.state;

        return hoveredFeature && (
            <div className="tooltip"
                 style={{
                     left: 10,
                     top: 10,
                     fontFamily: 'Montserrat',
                     fontSize: '14px',
                     backgroundColor: '#FF8567',
                     opacity: 1,
                     color: '#FFF',
                     padding: '10px 10px 10px 10px',
                     borderRadius: '5px'
                 }}>
                 <div>Details:</div>
                <div>Suburb: {hoveredFeature.properties.Suburb}</div>
                <div>Population of Chinese Resident: {hoveredFeature.properties.Population}</div>
                <div>Count of Crime/Offence (2017): {hoveredFeature.properties.OffenceCount}</div>
                <div>1-bed Flat Avg. Rental Rate (2018): {hoveredFeature.properties.RentalRate_1Bed_Flat}</div>
            </div>
        );
    }

    _onViewportChange = (viewport) => {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
        const {longitude, latitude, zoom} = this.state.viewport;
        const interest = this.props.interest;

        console.log(longitude, latitude, zoom);
        const xl = latitude - 0.005 * zoom;
        const yl = longitude - 0.005 * zoom;
        const xh = latitude + 0.005 * zoom;
        const yh = longitude + 0.005 * zoom;
        //
        // fetch('http://localhost:3002/restaurants/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
        fetch('http://35.189.58.222/restaurants/' + xl + '/' + yl + '/' + xh + '/' + yh + '/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
        fetch('http://35.189.58.222/clinic/' + xl + '/' + yl + '/' + xh + '/' + yh + '/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    clinics: json,
                })
            });
        fetch('http://35.189.58.222/community/' + xl + '/' + yl + '/' + xh + '/' + yh + '/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    communities: json,
                })
            });
        fetch('http://35.189.58.222/store/' + xl + '/' + yl + '/' + xh + '/' + yh + '/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    stores: json,
                })
            });
        fetch('http://35.189.58.222/interest/' + interest + '/' + latitude + '/' + longitude)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    interests: json,
                })
            });

    }

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
                   onClose={() => this.setState({popupInfo: null})}>
                <CityInfo info={popupInfo}/>
            </Popup>
        );
    }

    _goToViewport = (latitude, longitude) => {
        this._onViewportChange({
            latitude: latitude,
            longitude: longitude,
            zoom: 13,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 800
        });
    };
    _onStyleChange = popStyle => this.setState({popStyle});

    _renderSchoolPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <SchoolPin size={50} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    _renderRestaurantPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <RestaurantPin size={30} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    _renderClinicPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <ClinicPin size={30} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    _renderCommunityPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <CommunityPin size={30} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    _renderStorePin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <StorePin size={30} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }


    _renderInterestPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <InterestPin size={40} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    toggle_show() {
        this.setState({
            show: !this.state.show
        })
    }

    toggle_show_clinic() {
        this.setState({
            show_clinics: !this.state.show_clinics
        })
    }

    toggle_show_community() {
        this.setState({
            show_communities: !this.state.show_communities
        })
    }

    toggle_show_store() {
        this.setState({
            show_stores: !this.state.show_stores
        })
    }


    toggle_show_interests() {
        this.setState({
            show_interests: !this.state.show_interests
        })
    }


    render() {
        const {viewport, settings, mapStyle, items, isLoaded, interests, clinics, communities, stores} = this.state;
        // const {longitude, latitude, zoom} = this.state.viewport;


        return (
            <div>
                <div id="mapBox">
                    <MapGL
                        {...viewport}
                        {...settings}
                        mapStyle={mapStyle}
                        onViewportChange={this._onViewportChange}
                        dragToRotate={false}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onHover={this._onHover}
                    >
                    {this._renderTooltip()}

                        {
                            this.state.show ?
                                items.map(this._renderRestaurantPin) : null
                        }
                        {
                            this.state.show_clinics ?
                                clinics.map(this._renderClinicPin) : null
                        }
                        {
                            this.state.show_communities ?
                                communities.map(this._renderCommunityPin) : null
                        }

                        {
                            this.state.show_stores ?
                                stores.map(this._renderStorePin) : null
                        }
                        {

                            interests.map(this._renderInterestPin)
                        }

                        {School.map(this._renderSchoolPin)}

                        <div className="control-panel"
                             style={{
                                 background: 'white',
                                 margin: '10px 10px 20px 650px',
                                 padding: '10px 20px 20px 20px',
                                 opacity: '0.8',
                                 borderRadius: '10px'
                             }}>
                            <h4>
                                Chinese Facility:
                            </h4>

                            <div>
                                <input type="checkbox" checked={this.state.show}
                                       onChange={() => this.toggle_show()}></input><span style={{paddingLeft:'10px'}}>Restaurant</span>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_clinics}
                                       onChange={() => this.toggle_show_clinic()}></input><span style={{paddingLeft:'10px'}}>Clinic</span>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_communities}
                                       onChange={() => this.toggle_show_community()}></input><span style={{paddingLeft:'10px'}}>Community</span>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_stores}
                                       onChange={() => this.toggle_show_store()}></input><span style={{paddingLeft:'10px'}}>Grocery Store</span>
                            </div>
                            <div style={{marginTop:'20px'}}>
                            <span >Click marker for details</span>
                            </div>
                          </div>

                          <div className="control-panel"
                               style={{
                                   background: 'white',
                                   margin: '240px 10px 20px 650px',
                                   padding: '10px 20px 20px 20px',
                                   opacity: '0.8',
                                   borderRadius: '10px'
                               }}>
                              <h4>
                                  Chinese Population(2016)
                              </h4>
                              <div id='colorlegend'>
                              </div>
                              <span  style={{fontSize:'10px',paddingRight:'120px',paddingLeft:'10px'}}>20</span>
                              <span  style={{fontSize:'10px'}}>6000</span>
                              <div style={{paddingTop:'20px'}}>
                              <span style={{fontSize:'10px'}}>
                                Data Authorised from Australia Burae Statics
                              </span>
                              </div>
                            </div>
                        {this._renderPopup()}
                        <div className="nav" style={navStyle}>
                            <NavigationControl onViewportChange={this._updateViewport}/>
                        </div>

                    </MapGL>
                </div>
            </div>
        )
    }
}
export default CaulfieldMapSection;
