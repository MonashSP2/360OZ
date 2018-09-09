import React, {Component} from "react";
import './map.css';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';


import RestaurantPin from './marker-data/amuseument-pin';
import Restaurant from './marker-data/test.json';
// import Restaurant from './marker-data/chinese';
import Restaurant1 from './marker-data/test1.json';

import jsondata from './population_15.geojson';
import {defaultMapStyle, dataLayer} from './map-style.js';
import {updatePopulation} from './utils';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';
import CityInfo from './marker-data/city-info';

import * as restaurantTemp from "d3";

const MAPBOX_TOKEN = 'pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA';

const navStyle = {
    position: 'absolute',
    bottom: 30,
    left: 0,
    padding: '10px'
};

class ClaytonMapSection extends Component {
    restaurantTemp;

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: -37.9150,
                longitude: 145.1300,
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
            isLoaded: false,
            items: [],//restaurants
            clinics:[],
            stores:[],
            communities:[],
        }
    };


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

        // const xl = latitude - 0.05;
        // const yl = longitude - 0.05;
        // const xh = latitude + 0.05;
        // const yh = longitude + 0.05;
        //
        // fetch('http://localhost:3002/restaurants/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
        //     .then(res => res.json())
        //     .then(json => {
        //         this.setState({
        //             isLoaded: true,
        //             items: json,
        //         })
        //     });

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
                     left: 0,
                     top: 0,
                     width: '400px',
                     fontFamily: 'Montserrat',
                     fontSize: '14px',
                     backgroundColor: '#FF8567',
                     opacity: 1,
                     color: '#FFF',
                     padding: '10px 10px 10px 10px',
                     borderRadius: '5px'
                 }}>
                <div>Suburb: {hoveredFeature.properties.Suburb}</div>
                <div>Population of Chinese Resident: {hoveredFeature.properties.Population}</div>
            </div>
        );
    }

    _onViewportChange = (viewport) => {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
        const {longitude, latitude, zoom} = this.state.viewport;

        console.log(longitude, latitude, zoom);
        const xl = latitude - 0.005*zoom;
        const yl = longitude - 0.005*zoom;
        const xh = latitude + 0.005*zoom;
        const yh = longitude + 0.005*zoom;
        //
        // fetch('http://localhost:3002/restaurants/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
        fetch('http://35.189.58.222/restaurants/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
        fetch('http://35.189.58.222/clinic/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    clinics: json,
                })
            });
        fetch('http://35.189.58.222/community/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    communities: json,
                })
            });
        fetch('http://35.189.58.222/store/'+ xl + '/'+ yl + '/' + xh + '/' + yh + '/' )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    stores: json,
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

    _renderRestaurantPin = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <RestaurantPin size={30} onClick={() => this.setState({popupInfo: city})}/>
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


    render() {
        const {viewport, settings, mapStyle, items, isLoaded,interest,clinics,communities,stores} = this.state;
        // const {longitude, latitude, zoom} = this.state.viewport;



        return (
            <div>
                <h3>
                    {interest}
                </h3>
                {/*<h3>*/}

                {/*</h3>*/}
                <div id="mapBox">
                    <MapGL
                        {...viewport}
                        {...settings}
                        mapStyle={mapStyle}
                        onViewportChange={this._onViewportChange}
                        dragToRotate={false}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    >
                        {/*{this._renderTooltip()}*/}
                        {
                            this.state.show?
                                items.map(this._renderRestaurantPin):null
                        }
                        {
                            this.state.show_clinics ?
                                clinics.map(this._renderRestaurantPin) : null
                        }
                        {
                            this.state.show_communities ?
                                communities.map(this._renderRestaurantPin) : null
                        }
                        {
                            this.state.show_stores ?
                                stores.map(this._renderRestaurantPin) : null
                        }


                        <div className="control-panel"
                             style={{
                                 background: 'white',
                                 margin: '10px 10px 20px 670px',
                                 padding: '10px 20px 20px 20px',
                                 opacity: '0.8',
                                 borderRadius: '10px'
                             }}>
                            <h3>
                                Chinese facility:
                            </h3>
                            <div>
                                <input type="checkbox" checked={this.state.show}
                                       onChange={() => this.toggle_show()}></input><label>Restaurant</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_clinics}
                                       onChange={() => this.toggle_show_clinic()}></input><label>Clinic</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_communities}
                                       onChange={() => this.toggle_show_community()}></input><label>Community</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={this.state.show_stores}
                                       onChange={() => this.toggle_show_store()}></input><label>Grocery Store</label>
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

export default ClaytonMapSection;
