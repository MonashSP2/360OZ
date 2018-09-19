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
import CityInfo from "./location-info";
import './showResults.css';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;


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
                latitude: -37.8764649,
                longitude: 145.0437644,
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
            returnPointsDay2: [],
            isLoaded: false
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

    _loadData = data => {

           const location = this.props.match.params.locationpara;
           const results = this.props.location.state.results;
           const locationSplit = location.split("&");
           console.log(results);
           let resultArrayJson = JSON.parse(results)
           let key;

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
        {/* console.log(this.myRef.current);*/}
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
