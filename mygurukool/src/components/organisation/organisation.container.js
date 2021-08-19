import React,{PureComponent} from 'react';
import axios from 'axios'
import Organization from './organisation.component';

class OrganisationContainer extends  PureComponent {

    state={
        country:{}
    }

    create(event){
        event.preventDefault();
        var data = {
                    orgName:event.target.orgName.value,
                    orgSize:event.target.orgSize.value,
                    orgCountry:event.target.orgCountry.value,
                    orgAddress:event.target.orgAddress.value,
                    username:event.target.username.value,
                    password:event.target.password.value,
                    creatorName:event.target.first_name.value,
                    }
        console.log(data)            
        axios.post('http://localhost:3001/saveOrg',data).then((result)=>{
            alert(result.data.success)
        }).catch((error)=>{
            console.log(error)
        })            
        
    }

    async getCountries(){
        var result = await axios.get('https://restcountries.eu/rest/v2/all').then((res)=>{
                                return res.data
                            }).catch((error)=>{
                                console.log(error)
                            })
        if(result.length > 0){
            await this.setState({country:result})
        }
                            
    }

    componentDidMount(){
        this.getCountries()
    }

    render(){
   
        return(
            <Organization
                create={this.create.bind(this)}
                {...this.state}
            />
        )
    }

}

export default OrganisationContainer;