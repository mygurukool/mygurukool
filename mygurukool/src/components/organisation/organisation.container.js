import React,{PureComponent} from 'react';
import axios from 'axios'
import Organization from './organisation.component';

class OrganisationContainer extends  PureComponent {

    create(event){
        event.preventDefault();
        var data = {
                    orgName:event.target.orgName.value,
                    orgSize:event.target.orgSize.value,
                    orgCountry:event.target.orgCountry.value,
                    orgAddress:event.target.orgAddress.value
                    }
        axios.post('http://localhost:3001/saveOrg',data).then((result)=>{
            alert(result.data.success)
        }).catch((error)=>{
            console.log(error)
        })            
        
    }

    render(){
   
        return(
            <Organization
                create={this.create.bind(this)}
            />
        )
    }

}

export default OrganisationContainer;