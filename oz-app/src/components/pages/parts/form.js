import React,{Component} from "react";
import { Form, Select } from 'antd';
import './form.css';

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class FormCampus extends Component{
  render(){

    return(
      <div>
      <form onSubmit={this.props.regionSearch}>

        <div className="dropItem" id='dropCustome'>
            <Select
            style={{ width: '300px',backgroundColor:'rgba(0, 0, 0, 0)', color:'#5B5B5B', fontSize:'20px',}}
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
          <button className="submit" id="submitButtonSection"><span id='searchButton'>Search</span></button>

        </div>
    	</form>
      </div>
    )
  }
}

export default FormCampus;
