import React,{PureComponent} from 'react';
import axios from 'axios'
import Organization from './organisation';
import * as _mgkAPI from "../util/MgkAPI";

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

        _mgkAPI.saveOrganisation(data).then((result)=>{
            alert('Created')
            this.props.history.push('/teachers')
        }).catch((error)=>{
            console.log('error')
        })            
    }

    async getCountries(){
        var result = await axios.get('https://api.first.org/data/v1/countries').then((res)=>{
                                
                                return res.data
                            }).catch((error)=>{
                                console.log(error)
                            })


        // if(result.length > 0){
        //     await this.setState({country:result})
        // }    
    }

    componentDidMount(){
        this.getCountries()
    }

    render(){
        console.log(this.props)
        return(
            <Organization
                create={this.create.bind(this)}
                {...this.state}
            />
        )
    }

}

export default OrganisationContainer;
