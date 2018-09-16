import React,{Component} from 'react'
import Form from './parts/form';
import './SearchCampus.css';
import BeforeButton from '../BeforeButton';
import { Redirect } from 'react-router';


class SearchCampus extends Component {
  state = {
    fireRedirect: false
  }
  regionSearch = async (e) => {
    e.preventDefault();
    this.setState({ fireRedirect: true })
    const text = e.target.textContent
    const campusText = /Select your campus(.*)Search/;
    const campusMatch = campusText.exec(text);
    this.setState({
      campus: campusMatch[1].toLowerCase(),
      error: ""
    });
  }

 render() {
   const { from } = this.props.location.state || '/'
   const { fireRedirect } = this.state
  return (
    <div>
      <div className="button-container">
        <BeforeButton />
      </div>
      <div className="beforeDesc">
        <h1 style={{paddingBottom: '20px'}} id='homeTitle'>Explore Suburbs</h1>
        <p style={{paddingBottom: '100px', fontSize:'16px', color:'#7F7F7F',width:'600px'}}>Find the <span style={{color:'#F08B6F'}}>best suburb</span> based on your preferred lifestyle, interests, demographics and other essential information. 

</p>
      </div>
      <div id="searchCampusStart">

        <div className="droplist">
        <Form regionSearch={this.regionSearch}/>
          {fireRedirect && (
          <Redirect to={{pathname:'/search'+ this.state.campus,
            state: {
              campus: this.state.campus }
          }}/>
        )}
      </div>
      </div>

    </div>
  )
}
}

export default SearchCampus;
