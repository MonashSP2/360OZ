import React,{Component} from "react";
import { Select } from 'antd';
import './form.css';

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class Form extends Component{
  render(){


    return(
      <form onSubmit={this.props.regionSearch}>

        <div className="dropItem" id='dropCustome'>
          <Select
          style={{ width: '100%',backgroundColor:'rgba(0, 0, 0, 0)', color:'#5B5B5B', fontFamily:'Montserrat', fontSize:'20px',}}
          placeholder="Select your campus"
          name="campus"
          onChange={handleChange}>
          <Option value="clayton">Clayton</Option>
          <Option value="caulfield">Caulfield</Option>
          <Option value="parkville">Parkville</Option>
          <Option value="Peninsula">Peninsula</Option>
          </Select>
        </div>

        <div id="submitSection">
          <button className="submit" ><span id='searchButton'>Search</span></button>

        </div>
    	</form>
    )
  }
}
export default Form;
