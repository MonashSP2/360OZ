import React, {Component} from 'react';
import MapGL, {FlyToInterpolator, Marker, Popup, NavigationControl} from 'react-map-gl';
import jsondata from '../population_15.geojson';
import {defaultMapStyle, dataLayer} from '../map-style.js';
import {fromJS} from 'immutable';
import '../map.css';
import {json as requestJson} from 'd3-request';
import SchoolPin from "../marker-data/school-pin";
import School from "../marker-data/school";
import InterestPin from '../marker-data/interest-pin';
<<<<<<< HEAD
import CityInfo from "./location-info";
import './showResults.css';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
=======
import CityInfo from "../marker-data/city-info";
import DeckGL, {LineLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc


const MAPBOX_TOKEN = 'pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA';


const navStyle = {
    position: 'absolute',
    bottom: 30,
    left: 0,
    padding: '10px'
};


function callback(key) {
  console.log(key);
}

class Results extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            viewport: {
<<<<<<< HEAD
                latitude: -37.8764649,
                longitude: 145.0437644,
=======
                latitude: -37.8764927,
                longitude: 145.0437792,
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc
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
            returnPoints: [],
<<<<<<< HEAD
            returnPointsDay2: [],
            isLoaded: false
=======
            isLoaded: false,
            returnCoordinates: []
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc
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
        const map = this.myRef.current.getMap();
        console.log(map);

        const location = this.props.match.params.locationpara;
        const results = this.props.location.state.results;
        const returnCoor = this.state.returnCoordinates;
        const locationSplit = location.split("&");

        map.on('load', function () {
            console.log(returnCoor);
            map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates":
                            // returnCoor,
                                [
                                    [locationSplit[1],locationSplit[0]],
                                    [145.0569391,-37.8889451],
                                    [145.0302512, -37.8667146],
                                    [145.0287011,-37.8609695],
                                ]
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#888888",
                    "line-width": 8
                }
            });
        });


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    _loadData = data => {

<<<<<<< HEAD
           const location = this.props.match.params.locationpara;
           const results = this.props.location.state.results;
           const locationSplit = location.split("&");
           console.log(results);
           let resultArrayJson = JSON.parse(results)
           let key;
=======
        updatePopulation(data, f => f.properties.chinese_population);
        const location = this.props.match.params.locationpara;
        const results = this.props.location.state.results;
        const locationSplit = location.split("&");
        console.log(results);
        let resultArr = results.split(",");
        // let resultA = String({"aaaaa": "a"});
        let resultArray = [];
        for (let i = 0 ; i < 4;i++){
            resultArray[i]='a';
        }
        for (let i = 0;i < resultArr.length;i++){
            resultArray[i]=resultArr[i].split(":")[1];
            console.log(resultArr[i].split(":")[1])
        }
        // if (resultArr.length < 4) {
        //     resultArr.push(resultA);
        //     resultArr.push(resultA);
        //     resultArr.push(resultA);
        // }
        console.log(resultArray);

        // const resultSplit = results.split("&");
        fetch('http://35.189.58.222/ondaychallenge/' + resultArray[0] + '/railwaystation/' + resultArray[2] + '/' + locationSplit[0] + '/' + locationSplit[1] + '/')
        // fetch('http://localhost:3002/ondaychallenge/vadafone/commonwealth/restaurant/-33.8670522/151.1957362')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    returnPoints: json,
                });
                let lon = this.state.returnPoints;
                console.log(lon);

                fetch('https://api.mapbox.com/directions/v5/mapbox/walking/' + lon[0].longitude + ',' + lon[0].latitude + ';' + lon[1].longitude + ',' + lon[1].latitude + '?geometries=geojson&access_token=pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA')
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            isLoaded: true,
                            returnCoordinates: res.routes[0].geometry.coordinates,
                        });

                        const location = this.props.match.params.locationpara;
                        const results = this.props.location.state.results;
                        const returnCoor = this.state.returnCoordinates;
                        const locationSplit = location.split("&");
                        //const arr1 = 'test';
                        console.log(returnCoor);

                        console.log("test");

                        const map = this.myRef.current.getMap();
                        console.log(map);
                        map.on('load', function () {
                            console.log(returnCoor);
                            map.addLayer({
                                "id": "route",
                                "type": "line",
                                "source": {
                                    "type": "geojson",
                                    "data": {
                                        "type": "Feature",
                                        "properties": {},
                                        "geometry": {
                                            "type": "LineString",
                                            "coordinates":
                                            // returnCoor,
                                                [
                                                    [locationSplit[1], locationSplit[0]],
                                                    [145.0569391, -37.8889451],
                                                    [145.0302512, -37.8667146],
                                                    [145.0287011, -37.8609695],
                                                ]
                                        }
                                    }
                                },
                                "layout": {
                                    "line-join": "round",
                                    "line-cap": "round"
                                },
                                "paint": {
                                    "line-color": "#888888",
                                    "line-width": 8
                                }
                            });
                        });


                    });
            });

        const mapStyle = defaultMapStyle
        // Add geojson source to map
            .setIn(['sources', 'chinese_population'], fromJS({type: 'geojson', data}))
            // Add point layer to map
            .set('layers', defaultMapStyle.get('layers').push(dataLayer));

        this.setState({data, mapStyle});
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc

           for (key in resultArrayJson) {
             if (key == 'mykiCard' && resultArrayJson[key] == true){
               resultArrayJson[key] = '711'
             }else if (key == 'mykiCard' && resultArrayJson[key] == false){
               resultArrayJson[key] = 'a'
             }
             if (key == 'groceries' && resultArrayJson[key] == true){
               resultArrayJson[key] = 'groceries'
             }else if (key == 'groceries' && resultArrayJson[key] == false){
               resultArrayJson[key] = 'a'
             }
             if (key == 'beddings' && resultArrayJson[key] == true){
               resultArrayJson[key] = 'beddings'
             }else if (key == 'beddings' && resultArrayJson[key] == false){
               resultArrayJson[key] = 'a'
             }
             if (key == 'cooking' && resultArrayJson[key] == true){
               resultArrayJson[key] = 'cooking'
             }else if (key == 'cooking' && resultArrayJson[key] == false){
               resultArrayJson[key] = 'a'
             }
             if (key == 'clothing' && resultArrayJson[key] == true){
               resultArrayJson[key] = 'clothing'
             }else if (key == 'clothing' && resultArrayJson[key] == false){
               resultArrayJson[key] = 'a'
             }
             console.log(key,resultArrayJson[key]);
           }
           let day1UrlParameter =[];
           let day2UrlParameter =[];
           let tempResultUrlParameter = [];
           for (key in resultArrayJson) {
             if (key == 'simCard'){
               day1UrlParameter.push(resultArrayJson[key])}
             else if (key == 'mykiCard'){
               day1UrlParameter.push(resultArrayJson[key])}
            else if (key == 'bankCard'){
                day1UrlParameter.push(resultArrayJson[key])}
            else if (key == 'goCampus'){
                day1UrlParameter.push(resultArrayJson[key])}
            else if (key == 'groceries'){
              day2UrlParameter.push(resultArrayJson[key])}
            else if (key == 'beddings'){
              day2UrlParameter.push(resultArrayJson[key])}
           else if (key == 'cooking'){
              day2UrlParameter.push(resultArrayJson[key])}
           else if (key == 'clothing'){
              day2UrlParameter.push(resultArrayJson[key])}
           }
           console.log(day1UrlParameter.length, day2UrlParameter.length);
           day1UrlParameter.push('a')
           day1UrlParameter.push('a')
           day1UrlParameter.push('a')
           day1UrlParameter.push('a')
           day2UrlParameter.push('a')
           day2UrlParameter.push('a')
           day2UrlParameter.push('a')
           day2UrlParameter.push('a')
           console.log(day1UrlParameter, day2UrlParameter);

           fetch('http://35.189.58.222/ondaychallenge/' + day1UrlParameter[0] + '/railwaystation/'+ day1UrlParameter[1] + '/' + day1UrlParameter[2] + '/'+ day1UrlParameter[3] + '/'  + locationSplit[0] + '/' + locationSplit[1] + '/')
               .then(res => res.json())
               .then(json => {

<<<<<<< HEAD
                 for (let i = 0; i < json.length; i++) {
                   if (json[i].length == 0){
                     delete json[i]
                     console.log(json[i]);
                   }
                  }
                  console.log(json);
                   this.setState({
                       isLoaded: true,
                       returnPoints: json,
                   });

                   let lon = this.state.returnPoints;
                   console.log(lon);

                   fetch('https://api.mapbox.com/directions/v5/mapbox/walking/' + lon[0].longitude + ',' + lon[0].latitude + ';' + lon[1].longitude + ',' + lon[1].latitude + '?geometries=geojson&access_token=pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA')
                       .then(res => res.json())
                       .then(res => {
                           this.setState({
                               isLoaded: true,
                               returnCoordinates: res.routes[0].geometry.coordinates,
                           });

                           const location = this.props.match.params.locationpara;

                           const results = this.props.location.state.results;
                           const returnCoor = this.state.returnCoordinates;
                           const locationSplit = location.split("&");


                           this.setState({latitude:parseFloat(locationSplit[0]),
                           longitude:parseFloat(locationSplit[1])})


                           this._goToViewport(this.state.latitude, this.state.longitude);
                           //console.log(returnCoor);

                           console.log("test");

                           const map = this.myRef.current.getMap();
                           //console.log(map);

                       });
               });


               fetch('http://35.189.58.222/ondaychallenge/' + day2UrlParameter[0] + '/'+ day2UrlParameter[1] +'/' + day2UrlParameter[2] +'/' +  day2UrlParameter[3] +'/'+ locationSplit[0] + '/' + locationSplit[1] + '/')
               // fetch('http://localhost:3002/ondaychallenge/vadafone/commonwealth/restaurant/-33.8670522/151.1957362')
                   .then(res => res.json())
                   .then(json => {
                       this.setState({
                           isLoaded: true,
                           returnPointsDay2: json,
                       });
                       let lon = this.state.returnPointsDay2;
                       console.log(lon);

                       fetch('https://api.mapbox.com/directions/v5/mapbox/walking/' + lon[0].longitude + ',' + lon[0].latitude + ';' + lon[1].longitude + ',' + lon[1].latitude + '?geometries=geojson&access_token=pk.eyJ1IjoicHNvbjAwMDEiLCJhIjoiY2pmeGZwdDc2NGEyNDMybnZuMDU0NTh6ZiJ9.NIPbcggFfW6c0tVUp9gvdA')
                           .then(res => res.json())
                           .then(res => {
                               this.setState({
                                   isLoaded: true,
                                   returnCoordinates: res.routes[0].geometry.coordinates,
                               });

                               const location = this.props.match.params.locationpara;

                               const results = this.props.location.state.results;
                               const returnCoor = this.state.returnCoordinates;
                               const locationSplit = location.split("&");


                               this.setState({latitude:parseFloat(locationSplit[0]),
                               longitude:parseFloat(locationSplit[1])})


                               this._goToViewport(this.state.latitude, this.state.longitude);
                               console.log("test");

                               const map = this.myRef.current.getMap();
                               //console.log(map);

                           });
                   });


           const mapStyle = defaultMapStyle
               // Add point layer to map
               .set('layers', defaultMapStyle.get('layers').push(dataLayer));

           this.setState({data, mapStyle});

       };


       _renderSchoolPin = (city, index) => {
           return (
               <Marker key={`marker-${index}`}
                       longitude={city.longitude}
                       latitude={city.latitude}>
                   <SchoolPin size={50} onClick={() => this.setState({popupInfo: city})}/>
               </Marker>
           );
       }
=======
    // _onHover = event => {
    //     const {features, srcEvent: {offsetX, offsetY}} = event;
    //     const hoveredFeature = features && features.find(f => f.layer.id === 'data');
    //     this.setState({hoveredFeature, x: offsetX, y: offsetY});
    // };
    //
    // _renderTooltip() {
    //     const {hoveredFeature, x, y} = this.state;
    //     return hoveredFeature && (
    //         <div className="tooltip"
    //              style={{
    //                  left: 0,
    //                  top: 0,
    //                  width: '400px',
    //                  fontFamily: 'Montserrat',
    //                  fontSize: '14px',
    //                  backgroundColor: '#FF8567',
    //                  opacity: 1,
    //                  color: '#FFF',
    //                  padding: '10px 10px 10px 10px',
    //                  borderRadius: '5px'
    //              }}>
    //             <div>Suburb: {hoveredFeature.properties.Suburb}</div>
    //             <div>Population of Chinese Resident: {hoveredFeature.properties.Population}</div>
    //         </div>
    //     );
    // }
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc

    _onViewportChange = viewport => this.setState({
        viewport: {...this.state.viewport, ...viewport}
    });

    _resize = () => this._onViewportChange({
        width: this.props.width || window.innerWidth - 550,
        height: this.props.height || window.innerWidth - 900
    });

    _updateViewport = (viewport) => {
        this.setState({viewport});
    };


    _goToViewport = (latitude, longitude) => {
        this._onViewportChange({
            latitude: latitude,
            longitude: longitude,
            zoom: 15,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 800
        });
    };
    _onStyleChange = popStyle => this.setState({popStyle});


    _redraw() {
<<<<<<< HEAD
        {/* console.log(this.myRef.current);*/}
=======
        //
        // console.log(this.myRef.current);
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc
    }

    _showResultPoints = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}>
                <InterestPin size={50} onClick={() => this.setState({popupInfo: city})}/>
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
                   onClose={() => this.setState({popupInfo: null})}>
                <CityInfo info={popupInfo}/>
            </Popup>
        );
    }

    render() {
        const location = this.props.match.params.locationpara;
        const results = this.props.location.state.results;
<<<<<<< HEAD
        const {viewport, settings, mapStyle, returnPoints, returnPointsDay2} = this.state;

        const locationSplit = location.split("&");
        return (
            <div>
              <Tabs style={{position:'absolute',left:'-45%',top:'8%',width:'95vw',height:'95vh',paddingLeft:'500px'}}
                tabBarGutter='200px' tabBarStyle={{border:'none'}} defaultActiveKey="1"  onChange={callback}>
                  <TabPane tab="Day 1" key="1" >
                    <div>
                  <div id="mapBox" style={{position:'absolute', top:'4%',left:'32%'}}>
                      <MapGL
                          {...viewport}
                          {...settings}
                          ref={this.myRef}
                          onViewportChange={this._onViewportChange}
                          dragToRotate={false}
                          mapboxApiAccessToken={MAPBOX_TOKEN}>
                          <div className="nav" style={navStyle}>
                              <NavigationControl onViewportChange={this._updateViewport}/>
                          </div>
                          {this._redraw()}
                          {returnPoints.map(this._showResultPoints)}
                          {this._renderPopup()}
                          {School.map(this._renderSchoolPin)}

                      </MapGL>
                  </div>
                  <div style={{marginLeft:'-500px',marginTop:'100px'}}>{returnPoints.map(item => (
                    <ul style={{listStyle:'none'}} key={item.id} >
                      <li id='locationContainer'>{item.name}</li>
                      <a id="googleExternal" target="_blank" rel="noopener noreferrer" href={'https://www.google.com/maps/place/' + item.latitude+','+item.longitude}>
                        </a>
                    </ul>
                ))}
=======
        const {viewport, settings, mapStyle, returnPoints, returnCoordinates} = this.state;
        const locationSplit = location.split("&");
        return (
            <div>
                <div>{location}</div>
                <div>{results},{results.split(",")[0].split(":")[1]}</div>
                <div>{returnPoints.map(item => (
                    <li key={item.id}>
                        {item.name},{item.latitude},{item.longitude}
                    </li>
                ))};
                </div>
                <div>{returnCoordinates.map(item => (
                    <li key={item.id}>
                        {item}
                    </li>
                ))};
                </div>
                <div id="mapBox">
                    <MapGL
                        {...viewport}
                        {...settings}
                        ref={this.myRef}
                        // ref={(map) => { this.map = map; }} mapStyle={mapStyle}
                        onViewportChange={this._onViewportChange}
                        dragToRotate={false}
                        mapboxApiAccessToken={MAPBOX_TOKEN}>
                        {this._redraw()}
                        {returnPoints.map(this._showResultPoints)}
                        {this._renderPopup()}
                    </MapGL>
>>>>>>> 383779d903464b6dd0a1d66dda1286e3424aa1dc
                </div>
                  </div>
                </TabPane>
                  <TabPane tab="Day 2" key="2">
                    <div>
                    <div style={{marginLeft:'-500px',marginTop:'100px'}}>{returnPointsDay2.map(item => (
                      <ul style={{listStyle:'none'}} key={item.id}>
                        <li id='locationContainer'>{item.name}</li>
                        <a id="googleExternal" target="_blank" rel="noopener noreferrer" href={'https://www.google.com/maps/place/' + item.latitude+','+item.longitude}>
                        </a>
                      </ul>
                    ))}
                    </div>

                    <div id="mapBox" style={{position:'absolute', top:'4%',left:'32%'}}>
                      <MapGL
                          {...viewport}
                          {...settings}
                          ref={this.myRef}
                          onViewportChange={this._onViewportChange}
                          dragToRotate={false}
                          mapboxApiAccessToken={MAPBOX_TOKEN}>
                          <div className="nav" style={navStyle}>
                              <NavigationControl onViewportChange={this._updateViewport}/>
                          </div>
                          {this._redraw()}
                          {returnPointsDay2.map(this._showResultPoints)}
                          {this._renderPopup()}

                      </MapGL>
                    </div>
                    </div>
                  </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default Results;
