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

        <div className="dropItem">
          <Select
          style={{ width: '99%', color:'white', fontFamily:'Montserrat', fontSize:'16px'}}
          placeholder="Select your campus"
          name="campus"
          onChange={handleChange}>
          <Option value="clayton">Clayton</Option>
          <Option value="caulfield">Caulfield</Option>
          <Option value="parkville">Parkville</Option>
          <Option value="berwick">Berwick</Option>
          </Select>
        </div>

        <div className="dropItem">
          <Select
          style={{ width: '99%', color:'white', fontFamily:'Montserrat', fontSize:'16px'}}
          placeholder="Select top most populated areas"
          name="age"
          onChange={handleChange}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
          </Select>
        </div>

        <div className="submitSection">
    		<button className="submit"><span>Search</span></button>
        </div>
    	</form>
    )
  }
}
export default Form;
