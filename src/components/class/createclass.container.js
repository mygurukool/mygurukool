import React,{PureComponent} from 'react';
import CreateClass from './CreateClass';
import * as _mgkAPI from "../util/MgkAPI";

class CreateClassContainer extends  PureComponent {

  create(event){
    event.preventDefault();
    let data = {
      name: event.target.className.value,
      section: event.target.section.value,
      ageGroup: event.target.ageGroup.value,
    }

    _mgkAPI.saveClass(data).then((result)=>{
      alert('Class Created');
    }).catch((error)=>{
      console.log('error')
    })
  }

  render(){
    console.log(this.props)
    return(
      <CreateClass
        create={this.create.bind(this)}
        {...this.state}
      />
    )
  }

}

export default CreateClassContainer;
