import React, {Component} from "react";
import {Select} from 'antd';
import './form.css';
const googleAPI = "AIzaSyDWejPl19kAZYK_7DqzMOUilUszigBhvVk";

class InterestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoaded: false,
            items: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // _onSearchInterestActive = (viewport) => {
    //     const input = this.state.value;
    //     // this.setState({
    //     //     // viewport: {...this.state.viewport, ...viewport}
    //     // });
    //     // const {longitude, latitude, zoom} = this.state.viewport;
    //
    //     // console.log(longitude, latitude, zoom);
    //     // const xl = latitude - 0.005 * zoom;
    //     // const yl = longitude - 0.005 * zoom;
    //     // const xh = latitude + 0.005 * zoom;
    //     // const yh = longitude + 0.005 * zoom;
    //     // //
    //     // fetch('http://localhost:3002/restaurants/' + xl + '/' + yl + '/' + xh + '/' + yh + '/')
    //     fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&keyword='+ input +'&key='+ googleAPI)
    //         .then(res => res.json())
    //         .then(json => {
    //             this.setState({
    //                 isLoaded: true,
    //                 items: json,
    //             })
    //         });
    //
    // }

    render() {


        return (
            <form onSubmit={this.props.interestSearch}>
                <div className='inputCustome'>
                    <input
                        id='inputInterest'
                        size="large"
                        placeholder="Input your interest"
                        name="interest"
                        value={this.state.value}
                        onChange={this.handleChange} required/>
                </div>
                <div id="submitSection">
                    <button className="submit"><span id='searchButton'>Search</span></button>
                </div>
            </form>
        )
    }
}

export default InterestForm;
